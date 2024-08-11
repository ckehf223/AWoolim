import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '/src/css/admin/ClubDetail.css';
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


  if (!club) {
    return <div>Loading...</div>; // 모임이 없으면 로딩 중 메시지 표시
  }

  return (
    <div className="club-detail">
      <div className="club-header">
        <h2>{club.clubTitle}</h2>
      </div>
      <div className="club-select">
        <h3>모임 정보</h3>
        <div className="select-boxes">
          <div className="select-box">카테고리: {club.category}</div>
          <div className="select-box">참여인원: {club.maxMember}</div>
          <div className="select-box">지정날짜: {new Date(club.dDay).toLocaleDateString()}</div>
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
          {members.length > 0 ? (
            members.map((member, index) => (
              <li key={index}>{member.userName}</li> // 멤버 이름을 출력
            ))
          ) : (
            <li>등록된 멤버가 없습니다.</li> // 멤버가 없을 경우
          )}
        </ul>
      </div>
    </div>
  );
}

export default ClubDetail;
