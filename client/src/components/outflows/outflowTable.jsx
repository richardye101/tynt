import React, { useReducer } from "react";
import { DateTime } from "luxon";
import _ from "lodash";
import Table from "../common/table";
import { paginate } from "../../utils/paginate";

const OutflowTable = ({ outflows, outflowCategories, outflowDestinations }) => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      selectedCategory: null,
      selectedDestination: null,
      curPage: 1,
      pageSize: 10, // wanna make this customizable by the user, maybe store in user settings
      sortColumn: { path: "date", order: "desc" },
      searchQuery: "",
      columns: [
        {
          path: "date",
          label: "Date",
          format: (item) =>
            DateTime.fromISO(item.date)
              // needed because datetime is midnight, which defaults to previous day for some reason :\
              //  also assumes we only ever look at the date of a transaction, not time
              .plus({ day: 1 })
              .toFormat("DD"),
        },
        { path: "outflowCategory.name", label: "Category" },
        {
          path: "amount",
          label: "Amount",
          format: (item) => "$" + item.amount,
        },
        { path: "outflowDestination.name", label: "Destination" },
        { path: "description", label: "Description" },
      ],
    }
  );

  const handlePageChange = (page) => {
    setState({ curPage: page });
  };

  const handleCategorySelect = (category) => {
    setState({ selectedCategory: category });
  };

  const handleDestinationSelect = (destination) => {
    setState({ selectedDestination: destination });
  };

  const handleSort = (sortColumn) => {
    console.log(
      `Sorting by ${state.sortColumn.path} in ${state.sortColumn.order}`
    );
    setState({ sortColumn });
  };

  const handleSearch = (query) => {
    setState({
      selectedCategory: null,
      selectedDestination: null,
      curPage: 1,
      searchQuery: query,
    });
  };

  const getPagedData = () => {
    const {
      curPage,
      pageSize,
      selectedCategory,
      selectedDestination,
      sortColumn,
      searchQuery,
    } = state;

    let filtered = outflows;
    if (selectedCategory && selectedCategory._id) {
      // if we have an id as well (single genre), then we filter, if not then dont
      filtered = outflows.filter(
        (outflow) => outflow.outflowCategory._id === selectedCategory._id
      );
    }
    if (selectedDestination && selectedDestination._id) {
      // if we have an id as well (single genre), then we filter, if not then dont
      filtered = filtered.filter(
        (outflow) => outflow.outflowDestination._id === selectedDestination._id
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((outflow) =>
        outflow.description.toLowerCase().includes(searchQuery)
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const pagedOutflows = paginate(sorted, curPage, pageSize);
    // console.log(outflows);
    // console.log(outflows.length);
    return { totalCount: filtered.length, data: pagedOutflows };
  };
  const {
    curPage,
    pageSize,
    selectedCategory,
    selectedDestination,
    sortColumn,
    searchQuery,
    columns,
  } = state;

  const { totalCount, data: pagedData } = getPagedData();

  return (
    <Table
      columns={columns}
      data={pagedData}
      sortColumn={sortColumn}
      onSort={handleSort}
    />
  );
};

export default OutflowTable;
