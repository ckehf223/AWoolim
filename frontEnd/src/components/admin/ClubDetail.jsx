import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import '/src/css/admin/ClubDetail.css';
import { ClubContext } from '/src/components/admin/ClubProvider';
import { Button } from 'reactstrap';
import instance from '/src/common/auth/axios';

const ClubDetail = () => {
  // URL 파라미터에서 clubId를 가져옴
  const { clubId } = useParams();
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchClubDetail = async () => {
      try {
        const response = await instance.get(`/admin/club/${clubId}`);
        setClub(response.data);

        const memberResponse = await instance.get(`/admin/club/${clubId}/members`);
        setMembers(memberResponse.data);
      } catch (error) {
        console.error('Error fetching club detail : ', error);
        navigate('/admin/club');
      }
    };
    fetchClubDetail();
  }, [clubId, navigate]);

  const handleDelete = () => {
    // 삭제하고 /club 페이지로 이동
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      // 서버에서 클럽을 삭제하는 로직 추가
      // 예: instance.delete(`/admin/club/${clubId}`);
      navigate('/admin/club');
    }
  }

  if (!club) {
    return <div>Loading...</div>; // 모임이 없으면 로딩 중 메시지 표시
  }

  return (
    <div className="club-detail">
      <div className="club-header">
        <h2>{club.clubTitle}</h2>
        <Button outline color='danger' className="delete-button" onClick={handleDelete}>모임 삭제</Button>
      </div>
      <div className="club-select">
        <h3>모임 정보</h3>
        <div className="select-boxes">
          <div className="select-box">카테고리: {club.category}</div>
          <div className="select-box">참여인원: {club.maxMember}</div>
          <div className="select-box">개설일: {new Date(club.dDay).toLocaleDateString()}</div>
          <div className="select-box">정기/일회: {club.regularType === 1 ? '정기모임' : '일회모임'}</div>
          <div className="select-box">모임장: {club.leaderName}</div>
          <div className="select-box">성별제한: {club.clubGender}</div>
          <div className="select-box">나이 제한: {club.ageLimit}</div>
          <div className="select-box">도시: {club.city}</div>
          <div className="select-box">구역: {club.district}</div>
        </div>
      </div>
      <div className="club-info">
        <h3>상세정보</h3>
        <p>{club.detailInfo}</p>
      </div>

      <div className="club-members">
        <h3>멤버 리스트</h3>
        <ul>
          {club.members && club.members.map((member, index) => (
            <li key={index}>{members.userName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ClubDetail;
