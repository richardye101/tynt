import React from "react";

const OutflowInsight = ({ value, context }) => {
  // console.log(value);
  return (
    <div className="insight">
      <div className="insightValue">
        <span>{value}</span>
      </div>
      <div className="insightContext">
        <span>{context}</span>
      </div>
    </div>
  );
};

export default OutflowInsight;
