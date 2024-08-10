import React from 'react';
import CountUp from 'react-countup';
import '/src/css/admin/Dashboard.css';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from '/src/components/admin/CustomCalendar';
import { Utils } from '/src/components/admin/Utils';
import { useState, useEffect } from 'react';
import instance from '/src/common/auth/axios'

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
  Legend,
);

const Dashboard = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: '데이터',
        backgroundColor: Object.values(Utils.CHART_COLORS),
        borderColor: Object.values(Utils.CHART_COLORS).map(color => color.replace('0.2', '1')),
        borderWidth: 1,
        hoverBackgroundColor: Object.values(Utils.CHART_COLORS).map(color => color.replace('0.2', '0.4')),
        hoverBorderColor: Object.values(Utils.CHART_COLORS).map(color => color.replace('0.2', '1')),
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
  };


  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReports: 0,
    totalRegularClubs: 0,
    totalOneTimeClubs: 0,
  })
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await instance.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats : ', error);
      }
    }
    fetchStats();
  }, [])


  return (
    <div className="dashboard">
      <h1>Welcome</h1>
      <p>관리자님 안녕하세요👋</p>
      <div className="stats">
        <div className="stat-card card1">
          <h3>누적 가입자 수</h3>
          <h4><CountUp start={0} end={stats.totalUsers} duration={2.75} separator="," />명</h4>
        </div>
        <div className="stat-card card2">
          <h3>총 정기 모임 횟수</h3>
          <h4><CountUp start={0} end={stats.totalRegularClubs} duration={2.75} separator="," />건</h4>
        </div>
        <div className="stat-card card3">
          <h3>총 일회 모임 횟수</h3>
          <h4> <CountUp start={0} end={stats.totalOneTimeClubs} duration={2.75} separator="," />명</h4>
        </div>
        <div className="stat-card card4">
          <h3>누적 신고 수</h3>
          <h4> <CountUp start={0} end={stats.totalReports} duration={2.75} separator="," />명</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="chart-container border p-3">
            <Bar data={data} options={options} width={100} height={460} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="chart-container border p-3">
            <CustomCalendar />
          </div>
        </div>
        <div className="col-md-6">
          <div className="chart-container border p-3">
            <Line data={data} options={options} width={100} height={300} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="chart-container border p-3">
            <Pie data={data} options={options} width={100} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
