import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { prepareChartData } from "../../utils/helper";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
    
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareChartData(data);
        setChartData(result);
        return () => {}
    }, [data])

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
