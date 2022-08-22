import React from "react";
import { DateTime } from "luxon";
import BarChart from "../common/barChart";
import OutflowInsight from "./outflowInsight";
import * as R from "ramda";
import _ from "lodash";

const OutflowInsightContainer = ({ data }) => {
  const insightData = R.map(
    (item) => ({
      ...item,
      datetime: DateTime.fromISO(item.date),
      month: DateTime.fromISO(item.date).toFormat("y-MM"),
    }),
    data
  );

  const getDailyAvgSpendInsight = R.pipe(
    R.filter((item) => item.month === DateTime.now().toFormat("y-MM")),
    R.pluck("amount"),
    R.mean
  );

  const chartStartDate = insightData[0]?.datetime.plus({ days: -14 });

  const getDailySpendChartData = R.pipe(
    R.filter((item) => item.datetime > chartStartDate),
    (data) => ({
      date: R.pluck("date", data),
      amount: R.pluck("amount", data),
    })
  );
  // console.log(getDailySpendChartData(insightData));

  const dailyChartFormat = {
    width: 250,
    height: 200,
    tickformat: "%a, %d",
  };

  const getMonthlySpendChartData = R.pipe(
    R.groupBy(R.prop("month")),
    R.map((month) => R.sum(R.pluck("amount", month))),
    (data) => ({
      month: R.keys(data),
      amount: R.values(data),
    })
  );
  console.log(getMonthlySpendChartData(insightData));

  const monthlyChartFormat = {
    width: 250,
    height: 200,
    tickformat: "%b %Y",
  };

  return (
    <>
      <div className="col-4">
        <div className="row">
          <OutflowInsight
            value={getDailyAvgSpendInsight(insightData)}
            context="/day this month"
          />
        </div>
        <div className="row">
          <BarChart
            data={getDailySpendChartData(insightData)}
            x="date"
            y="amount"
            title="Daily Outflow chart"
            format={dailyChartFormat}
          />
        </div>
      </div>
      <div className="col-4">
        <div className="row">
          <OutflowInsight
            value={getDailyAvgSpendInsight(insightData)}
            context="/day this month"
          />
        </div>
        <div className="row">
          <BarChart
            data={getMonthlySpendChartData(insightData)}
            x="month"
            y="amount"
            title="Monthly Outflow chart"
            format={monthlyChartFormat}
          />
        </div>
      </div>
      <div className="col-4">
        <div className="row">Hello</div>
        <div className="row">
          <BarChart
            data={data}
            x="date"
            y="amount"
            title="Daily Outflow chart"
            format={dailyChartFormat}
          />
        </div>
      </div>
    </>
  );
};

export default OutflowInsightContainer;
