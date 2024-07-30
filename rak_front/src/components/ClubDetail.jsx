import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import './ClubDetail.css';
import { ClubContext } from '../ClubContext';
import { Button } from 'reactstrap';


const ClubDetail = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const { clubs, deleteClub } = useContext(ClubContext);
  const club = clubs.find(club => club.id === parseInt(clubId, 10));

  useEffect(() => {
    if (!club) {
      navigate('/club');
    }
  }, [club, navigate]);

  const handleDelete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      deleteClub(club.id);
      navigate('/club');
    }
  }





  return (
    <div className="club-detail">
      <div className="club-header">
        <h2>{club.name}</h2>
        <Button outline color='danger' className="delete-button" onClick={handleDelete}>모임 삭제</Button>
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
