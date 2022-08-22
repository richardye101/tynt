import React, { useReducer } from "react";
import _ from "lodash";

const TableBody = ({ data, columns, valueProperty = "_id" }) => {
  // const [state, setState] = useReducer(
  //   (state, newState) => ({ ...state, ...newState }),
  //   {
  //     data,
  //     columns,
  //   }
  // );
  // useEffect(() => {
  //   const setStates = async () => {};
  // });
  // console.log(state.data);

  // Show an empty table
  if (data.length === 0) {
    return (
      <tbody className="emptyTable">
        <tr>
          <td colSpan={columns.length}>This table is empty</td>
        </tr>
      </tbody>
    );
  }

  const createKey = (item, column) => {
    return item[valueProperty] + column.path;
  };
  const renderCell = (item, column) => {
    if (column.format) return column.format(item);
    return _.get(item, column.path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item[valueProperty]}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
