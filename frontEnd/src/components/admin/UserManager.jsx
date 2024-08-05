import React from 'react'
import { useState, useEffect } from 'react'
import { Table, Input, Button, FormGroup, Label, Col } from 'reactstrap'
import '/src/css/admin/UserManager.css'
import ModalComponent from '/src/components/admin/ModalComponent'
import useModal from '/src/common/useModal'
import update from 'immutability-helper'
import PaginationComponent from '/src/components/admin/PaginationComponent'
import instance from '/src/common/auth/axios'

const UserManager = () => {



  // 초기 유저 데이터 초기화
  const [users, setUsers] = useState([]);
  // 검색 결과를 담을 상태
  const [filteredUsers, setFilteredUsers] = useState([]);

  //-------------------------유저정보-------------------------
  const fetchUsers = async () => {
    try {
      const response = await instance.get('/admin/userlist');
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching users : ', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  //-------------------------유저정보-------------------------

  //------------------------유저삭제-------------------------
  const deleteUser = async () => {
    if (selectedUser) {
      try {
        await instance.post('/admin/userdelete', selectedUser.userId);
        fetchUsers();
        window.confirm('정말 삭제하시겠습니까 ?');
      } catch (error) {
        console.error('Error deleting user : ', error);
        window.alert('유저 삭제에 실패했습니다.');
      }
      toggleModal();
    }
  }
  //------------------------유저삭제-------------------------


  //-------------------------모달상태-------------------------
  const { isModalOpen, toggleModal } = useModal();
  const [selectedUser, setSelectedUser] = useState(null);
  //-------------------------모달상태-------------------------


  // -------------------------페이지네이션-------------------
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  //-------------------------페이지네이션-------------------


  //-------------------------검색기능-------------------------
  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumn, setSearchColumn] = useState('name');

  const handleSearch = () => {
    if (searchTerm === '') {
      setFilteredUsers(users);
    } else {
      const newFilteredUsers = users.filter(user => {
        const value = user[searchColumn] ? user[searchColumn].toString() : '';
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredUsers(newFilteredUsers);
    }
    setCurrentPage(1); // 검색 결과가 갱신될 때 페이지를 첫 번째로 설정
  };
  //-------------------------검색기능-------------------------

  // 유저 상세정보 모달
  const openUserModal = (user) => {
    setSelectedUser(user);
    toggleModal();
  }

  return (
    <div className='UserManager'>
      {/* **********검색바********** */}
      <div className='search-bar'>
        <FormGroup row className='form-group'>
          <Label for='searchColumn' sm={2}></Label>
          <Col sm={3}>
            <Input
              type='select'
              name='searchColumn'
              id='searchColumn'
              value={searchColumn}
              onChange={(e) => setSearchColumn(e.target.value)}
            >
              <option value="userName">이름</option>
              <option value="userEmail">이메일</option>
              <option value="userId">아이디</option>
            </Input>
          </Col>
          <Col sm={4}>
            <Input
              type='search'
              placeholder='검색어를 입력하세요'
              className='mb-3'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></Input>
          </Col>
          <Col sm={3}>
            <Button color='primary' onClick={handleSearch}>검색하기</Button>
          </Col>
        </FormGroup>
      </div>
      {/* **********검색바********** */}

      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>이름</th>
            <th>이메일</th>
            <th>생년월일</th>
            <th>핸드폰</th>
            <th>성별</th>
            <th className='action-column'>상세정보</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.userId}>
              <th scope="row">{user.userId}</th>
              <td>{user.userName}</td>
              <td>{user.userEmail}</td>
              <td>{user.userBirth}</td>
              <td>{user.userPhone}</td>
              <td>{user.userGender}</td>
              <td><Button outline color='primary' onClick={() => openUserModal(user)}>정보보기</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationComponent
        className='pagination'
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ModalComponent isOpen={isModalOpen} toggle={toggleModal} title='유저정보' onDelete={deleteUser} >
        <div>
          <div>이름: {selectedUser?.userName}</div>
          <div>이메일: {selectedUser?.userEmail}</div>
          <div>생년월일: {selectedUser?.userBirth}</div>
          <div>전화번호: {selectedUser?.userPhone}</div>
          <div>성별: {selectedUser?.userGender}</div>
          <div>닉네임: {selectedUser?.nickname}</div>
          <div>프로필 사진: {selectedUser?.userImage}</div>
          <div>프로필 배경사진: {selectedUser?.userBackImage}</div>
          <div>한줄 소개: {selectedUser?.userIntro}</div>
          <div>경고 횟수: {selectedUser?.warningCount}</div>
          <div>회원가입 방법: {selectedUser?.snsType}</div>
          <div>권한: {selectedUser?.role}</div>
        </div>
      </ModalComponent>

    </div>
  )
}

export default UserManager