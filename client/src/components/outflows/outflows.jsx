import React, { useEffect, useReducer } from "react";
import { getOutflows } from "../../services/outflowService";
import { getCategories } from "../../services/outflowCategoryService";
import { getDestinations } from "../../services/outflowDestinationService";
import OutflowTable from "./outflowTable";
import OutflowInsightContainer from "./outflowInsightContainer";

const Outflows = (props) => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      outflows: [],
      outflowCategories: [],
      outflowDestinations: [],
    }
  );

  useEffect(() => {
    const setStates = async () => {
      const outflows = await getOutflows();
      const categories = await getCategories();
      const destinations = await getDestinations();
      setState({
        outflows,
        outflowCategories: [{ _id: "", name: "All Categories" }, ...categories],
        outflowDestinations: [
          { _id: "", name: "All Destinations" },
          ...destinations,
        ],
      });
    };
    setStates();
  }, []);

  return (
    <>
      <h1>Here I'll put the table of outflows</h1>
      <p>
        Placeholder text for some large overview numbers, like current month
        spend, current year spend, avg spend per day etc
      </p>
      <div className="container">
        <div className="row">
          <OutflowInsightContainer data={state.outflows} />
        </div>
        <div className="row">
          <OutflowTable
            outflows={state.outflows}
            outflowCategories={state.outflowCategories}
            outflowDestinations={state.outflowDestinations}
          />
        </div>
      </div>
    </>
  );
};

export default Outflows;
