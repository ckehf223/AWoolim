import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './ClubDetail.css';

const clubs = [
  { id: 1, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['회원 1', '회원 2', '회원 3'], category: '운동', people: 10, date: '2024-07-25', regular: '정기' },
  { id: 2, name: '교양모임', description: '교양을 즐기는 사람들의 모임입니다.', members: ['회원 4', '회원 5', '회원 6'], category: '교양', people: 20, date: '2024-07-25', regular: '일회' },
  { id: 3, name: '운동모임', description: '운동을 좋아하는 사람들의 모임입니다.', members: ['회원 7', '회원 8', '회원 9'], category: '운동', people: 30, date: '2024-07-25', regular: '정기' },
];

const ClubDetail = () => {
  const { clubId } = useParams();
  const club = clubs.find(club => club.id === parseInt(clubId));



  return (
    <div className="club-detail">
      <div className="club-header">
        <h2>{club.name}</h2>
        <button className="delete-button">모임 삭제</button>
      </div>
      <div className="club-select">
        <h3>선택한 내용</h3>
        <div className="select-boxes">
          <div className="select-box">카테고리: {club.category}</div>
          <div className="select-box">참여인원: {club.people}</div>
          <div className="select-box">개설일: {club.date}</div>
          <div className="select-box">정기/일회: {club.regular}</div>
        </div>
      </div>
      <div className="club-info">
        <h3>상세정보</h3>
        <p>{club.description}</p>
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
