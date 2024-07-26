import React from "react";
import './Dashboard.css';
import { Chart } from 'react-google-charts';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


const Dashboard = () => {

  const data = [["Age", "Weight"], [4, 5.5], [8, 12]];
  const options = {
    title: "Chart Title",
    colors: ["#2980b9", "#3498db"],
    titleTextStyle: {
      fontSize: 24
    }
  };

  const events = [
    { title: 'Event 1', date: '2023-07-01' },
    { title: 'Event 2', date: '2023-07-02' }
  ];


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
          <div className="calendar-container border p-3">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay'
              }}
              height='400px'
            />
          </div>
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