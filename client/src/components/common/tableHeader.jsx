import React from "react";

const TableHeader = (props) => {
  const raiseSort = (path) => {
    const sortColumn = { ...props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    props.onSort(sortColumn);
  };

  const renderSortIcon = () => {
    const { sortColumn } = props;
    if (column.path !== sortColumn.path) return null;
    return sortColumn.order === "acs" ? (
      <i className="fa fa-sort-asc"></i>
    ) : (
      <i className="fa fa-sort-desc"></i>
    );
  };

  return (
    <thead>
      <tr>
        {props.columns.map((column) => (
          <th
            className="clickable"
            onClick={() => raiseSort(column.path)}
            key={column.path || column.key}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
