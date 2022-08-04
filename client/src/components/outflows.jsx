import React from "react";
import { useReducer } from "react";

const Outflows = (props) => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      outflows: [],
      outflowCategories: [],
      selectedCategory: null,
      curPage: 1,
      pageSize: 10, // wanna make this customizable by the user, maybe store in user settings
      sortColumn: { path: "date", order: "desc" },
      searchQuery: "",
    }
  );

  return (
    <>
      <h1>Here I'll put the table of outflows</h1>
      <p>
        Placeholder text for some large overview numbers, like current month
        spend, current year spend, avg spend per day etc
      </p>
      <p>Table goes here</p>
    </>
  );
};

export default Outflows;
