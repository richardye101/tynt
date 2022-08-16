import React from "react";
import _ from "lodash";

const TableBody = ({ data, columns, valueProperty = "_id" }) => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      data,
      columns,
    }
  );

  const createKey = (item, column) => {
    return item[valueProperty] + (column.path || column.key);
  };
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.pick(item, column.path);
  };
  return (
    <tbody>
      {state.data.map((item) => (
        <tr key={item[valueProperty]}>
          {state.columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
