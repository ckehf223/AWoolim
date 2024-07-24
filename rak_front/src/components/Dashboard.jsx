import React from "react";
import './Dashboard.css';
import { Chart } from 'react-google-charts';


const Dashboard = () => {
  const data = [["Age", "Weight"], [4, 5.5], [8, 12]];
  const options = {
    title: "Chart Title",
    colors: ["#2980b9", "#3498db"],
    titleTextStyle: {
      fontSize: 24
    }
  };


  return (
    <div className="Dashboard">
      <div className="row">
        <div className="col-md-6">
          <div className="chart-container border p-3"><Chart
            chartType="BarChart"
            data={data}
            options={options}
            width="100%"
            height="100%"
          /></div>
        </div>
        <div className="col-md-6">
          <div className="chart-container border p-3"><Chart
            chartType="ScatterChart"
            data={data}
            options={options}
            width="100%"
            height="100%"
          /></div>
        </div>
        <div className="col-md-6">
          <div className="chart-container border p-3"><Chart
            chartType="AreaChart"
            data={data}
            options={options}
            width="100%"
            height="400px"
          /></div>
        </div>
        <div className="col-md-6">
          <div className="chart-container border p-3"> <Chart
            chartType="ColumnChart"
            data={data}
            options={options}
            width="100%"
            height="400px"
          /></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;