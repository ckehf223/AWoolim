import React from "react";
import './Dashboard.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js 모듈 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }

  }

  const events = [
    { title: 'Event 1', date: '2023-07-01' },
    { title: 'Event 2', date: '2023-07-02' }
  ];


  return (
    <div className="Dashboard">
      <div className="row">
        <div className="col-md-6">
          <div className="chart-container border p-3">
            <Bar data={data} options={options} width={100} height={400} />
          </div>
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
          <div className="chart-container border p-3">
            <Line data={data} options={options} width={100} height={300} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="chart-container border p-3">
            <Doughnut data={data} options={options} width={100} height={300} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;