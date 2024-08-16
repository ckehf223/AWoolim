import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import '/src/css/admin/common/Dashboard.css';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import 'react-calendar/dist/Calendar.css';
import CustomCalendar from '/src/components/admin/common/CustomCalendar';
import { Utils } from '/src/common/Utils';
import instance from '/src/auth/axios';

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
  const [genderRatio, setGenderRatio] = useState({
    maleCount: 0,
    femaleCount: 0,
  });
  const [categoryData, setCategoryData] = useState([]);
  const [participationStats, setParticipationStats] = useState([]);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const response = await instance.get('/admin/categorycounts');
        setCategoryData(response.data);
      } catch (error) {
        console.error('Error fetching category counts:', error);
      }
    };

    fetchCategoryCounts();
  }, []);

  const barData = {
    labels: categoryData.map(item => item.CATEGORY),
    datasets: [
      {
        label: '모임 수',
        backgroundColor: Object.values(Utils.CHART_COLORS),
        borderColor: Object.values(Utils.CHART_COLORS).map(color => color.replace('0.2', '1')),
        borderWidth: 1,
        hoverBackgroundColor: Object.values(Utils.CHART_COLORS).map(color => color.replace('0.2', '0.4')),
        hoverBorderColor: Object.values(Utils.CHART_COLORS).map(color => color.replace('0.2', '1')),
        data: categoryData.map(item => item.CATEGORYCOUNT),
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
  });

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
  }, []);

  useEffect(() => {
    const fetchGenderRatio = async () => {
      try {
        const response = await instance.get('/admin/gender');
        setGenderRatio(response.data);
        console.log('genderRatio : ', response.data);
      } catch (error) {
        console.error('Error fetching gender ratio : ', error);
      }
    };
    fetchGenderRatio();
  }, []);

  const genderData = {
    labels: ['남성', '여성'],
    datasets: [
      {
        data: [genderRatio.MALECOUNT, genderRatio.FEMALECOUNT],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  useEffect(() => {
    const fetchParticipationStats = async () => {
      try {
        const response = await instance.get('/admin/user-participation-stats');
        setParticipationStats(response.data);
        console.log('participationStats : ', response.data);
      } catch (error) {
        console.error('Error fetching participation stats: ', error);
      }
    };
    fetchParticipationStats();
  }, []);

  const participationData = {
    labels: participationStats.map(stat => stat.PARTICIPATION_LEVEL),
    datasets: [
      {
        label: '유저 별 모임 참여 횟수',
        data: participationStats.map(stat => stat.USER_COUNT),
        backgroundColor: Object.values(Utils.CHART_COLORS),
        borderColor: Object.values(Utils.CHART_COLORS).map(color => color.replace('0.2', '1')),
        borderWidth: 1,
      }
    ]
  };

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
          <h4> <CountUp start={0} end={stats.totalOneTimeClubs} duration={2.75} separator="," />건</h4>
        </div>
        <div className="stat-card card4">
          <h3>누적 신고 수</h3>
          <h4> <CountUp start={0} end={stats.totalReports} duration={2.75} separator="," />건</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="chart-container border p-3">
            <Bar data={barData} options={options} width={100} height={460} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="chart-container border p-3">
            <CustomCalendar />
          </div>
        </div>
        <div className="col-md-6">
          <div className="chart-container border p-3">
            <Bar data={participationData} options={options} width={100} height={300} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="chart-container border p-3">
            <Pie data={genderData} options={options} width={100} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
