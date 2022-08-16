import React, { useEffect } from "react";
import { useReducer } from "react";
// import OutflowTable from "./outflowTable";
import { paginate } from "../utils/paginate";

const Outflows = (props) => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      outflows: [],
      outflowCategories: [],
      outflowDestinations: [],
      selectedCategory: null,
      selectedDestination: null,
      curPage: 1,
      pageSize: 10, // wanna make this customizable by the user, maybe store in user settings
      sortColumn: { path: "date", order: "desc" },
      searchQuery: "",
      columns: [
        { path: "date", label: "Date" },
        { path: "outflowCategory", label: "Category" },
        { path: "amount", label: "Amount" },
        { path: "outflowDestination", label: "Destination" },
        { path: "description", label: "Description" },
      ],
    }
  );

  useEffect(() => {
    const setStates = async () => {
      const outflows = await getOutflows();
      const categories = await getCategories();
      const destinations = await getDestinations();
      setState({
        outflows,
        categories: [{ _id: "", name: "All Categories" }, ...categories],
        destinations: [{ _id: "", name: "All Destinations" }, ...destinations],
      });
    };

    setStates();
  }, []);

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
      outflows: allOutflows,
      selectedCategory,
      selectedDestination,
      sortColumn,
      searchQuery,
    } = state;

    let filtered = allOutflows;
    if (selectedCategory && selectedCategory._id) {
      // if we have an id as well (single genre), then we filter, if not then dont
      filtered = allOutflows.filter(
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
    const outflows = paginate(sorted, curPage, pageSize);
    console.log(filtered);
    console.log(filtered.length);
    return { totalCount: filtered.length, data: outflows };
  };

  const { length: count } = state.outflows;
  const {
    curPage,
    pageSize,
    outflows: allOutflows,
    selectedCategory,
    selectedDestination,
    sortColumn,
    searchQuery,
    columns,
  } = state;
  const { totalCount, data: outflows } = getPagedData();

  return (
    <>
      <h1>Here I'll put the table of outflows</h1>
      <p>
        Placeholder text for some large overview numbers, like current month
        spend, current year spend, avg spend per day etc
      </p>
      <p>Table goes here</p>
      <Table
        columns={columns}
        data={outflows}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </>
  );
};

export default Outflows;
