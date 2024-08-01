import React from 'react'
import { useState, useEffect } from 'react'
import { Table, Input, Button, FormGroup, Label, Col } from 'reactstrap'
import './UserManager.css'
import ModalComponent from './ModalComponent'
import useModal from './useModal'
import update from 'immutability-helper'
import PaginationComponent from './PaginationComponent'

const UserManager = () => {

  const initialUsers = [
    { id: 1, name: 'Name', email: 'name@example.com', userId: 'abc1', password: '1234', role: 'admin' },
    { id: 2, name: 'Name', email: 'name@example.com', userId: 'abc2', password: '1234', role: 'admin' },
    { id: 3, name: '이름', email: 'alice@example.com', userId: 'abc3', password: '1234', role: 'admin' },
    { id: 4, name: 'Name', email: 'name@example.com', userId: 'abc1', password: '1234', role: 'admin' },
    { id: 5, name: 'Name', email: 'name@example.com', userId: 'abc2', password: '1234', role: 'admin' },
    { id: 6, name: '이름', email: 'alice@example.com', userId: 'abc3', password: '1234', role: 'admin' },
    { id: 7, name: 'Name', email: 'name@example.com', userId: 'abc1', password: '1234', role: 'admin' },
    { id: 8, name: 'Name', email: 'name@example.com', userId: 'abc2', password: '1234', role: 'admin' },
    { id: 9, name: '이름', email: 'alice@example.com', userId: 'abc3', password: '1234', role: 'admin' },
    { id: 10, name: 'Name', email: 'name@example.com', userId: 'abc1', password: '1234', role: 'admin' },
    { id: 11, name: 'Name', email: 'name@example.com', userId: 'abc2', password: '1234', role: 'admin' },
    { id: 12, name: '이름', email: 'alice@example.com', userId: 'abc3', password: '1234', role: 'admin' },
    { id: 13, name: 'Name', email: 'name@example.com', userId: 'abc1', password: '1234', role: 'admin' },
    { id: 14, name: 'Name', email: 'name@example.com', userId: 'abc2', password: '1234', role: 'admin' },
    { id: 15, name: '이름', email: 'alice@example.com', userId: 'abc3', password: '1234', role: 'admin' },
    { id: 16, name: 'Name', email: 'name@example.com', userId: 'abc1', password: '1234', role: 'admin' },
    { id: 17, name: 'Name', email: 'name@example.com', userId: 'abc2', password: '1234', role: 'admin' },
    { id: 18, name: '이름', email: 'alice@example.com', userId: 'abc3', password: '1234', role: 'admin' },
    { id: 19, name: 'Name', email: 'name@example.com', userId: 'abc1', password: '1234', role: 'admin' },
    { id: 20, name: 'Name', email: 'name@example.com', userId: 'abc2', password: '1234', role: 'admin' },
    { id: 21, name: '이름', email: 'alice@example.com', userId: 'abc3', password: '1234', role: 'admin' },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);

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
      const newFilteredUsers = users.filter(user =>
        user[searchColumn].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(newFilteredUsers);
    }
    setCurrentPage(1); // 검색 결과가 갱신될 때 페이지를 첫 번째로 설정
  };
  //-------------------------검색기능-------------------------


  const openUserModal = (user) => {
    setSelectedUser(user);
    toggleModal();
  }

  const deleteUser = () => {
    if (selectedUser) {
      const userIndex = users.findIndex(user => user.id === selectedUser.id);
      setUsers(update(users, { $splice: [[userIndex, 1]] }));
      window.confirm('정말 삭제하시겠습니까 ?');
      toggleModal();
    }
  }





  return (
    <div className='UserManager'>
      <h1>User Manager</h1>
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
              <option value="name">이름</option>
              <option value="email">이메일</option>
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
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>userId</th>
            <th>Role</th>
            <th className='action-column'>상세정보</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.userId}</td>
              <td>{user.role}</td>
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
          <div>이름: {selectedUser?.name}</div>
          <div>이메일: {selectedUser?.email}</div>
          <div>역할: {selectedUser?.role}</div>
          <div>아이디: {selectedUser?.userId}</div>
          <div>비밀번호: {selectedUser?.password}</div>
        </div>
      </ModalComponent>

    </div>
  )
}

export default UserManager