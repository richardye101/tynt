import React from "react";

const OutflowTable = ({ outflows, sortColumn, onSort }) => {
  columns = [
    { path: "date", label: "Date" },
    { path: "outflowCategory", label: "Category" },
    { path: "amount", label: "Amount" },
    { path: "destination", label: "Destination" },
    { path: "description", label: "Description" },
  ];
  return (
    <Table
      columns={columns}
      data={outflows}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default OutflowTable;
