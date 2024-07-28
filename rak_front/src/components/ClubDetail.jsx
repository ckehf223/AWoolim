import React from 'react';
import { useParams } from 'react-router-dom';
import './ClubDetail.css';

const ClubDetail = () => {
  const { clubId } = useParams();

  // 예시 데이터
  const club = {
    id: clubId,
    name: `모임 ${clubId}`,
    description: `이것은 모임 ${clubId}의 상세 정보입니다. 여기에 모임에 대한 설명이 들어갑니다.`,
    members: ['회원 1', '회원 2', '회원 3'],
  };

  return (
    <div className="club-detail">
      <div className="club-header">
        <h2>{club.name}</h2>
        <button className="delete-button">모임 삭제</button>
      </div>
      <div className="club-info">
        <h3>상세정보</h3>
        <p>{club.description}</p>
      </div>
      <div className="club-select">
        <h3>선택한 내용</h3>
        <div className="select-boxes">
          <div className="select-box">선택한 내용</div>
          <div className="select-box">선택한 내용</div>
          <div className="select-box">선택한 내용</div>
          <div className="select-box">선택한 내용</div>
        </div>
      </div>
      <div className="club-members">
        <h3>멤버 리스트</h3>
        <ul>
          {club.members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ClubDetail;
