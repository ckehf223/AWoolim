import React from 'react'
import { useState } from 'react'
import { Table, Input, Button } from 'reactstrap'
import './UserManager.css'
import ModalComponent from './ModalComponent'
import useModal from './useModal'
import update from 'immutability-helper'

const UserManager = () => {
  //모달상태
  const { isModalOpen, toggleModal } = useModal();
  const [selectedUser, setSelectedUser] = useState(null);

  const openUserModal = (user) => {
    setSelectedUser(user);
    toggleModal();
  }

  const deleteUser = () => {
    if (selectedUser) {
      const userIndex = users.findIndex(user => user.id === selectedUser.id);
      setUsers(update(users, { $splice: [[userIndex, 1]] }));
      window.alert('삭제되었습니다.');
      toggleModal();
    }
  }

  const [users, setUsers] = useState([
    { id: 1, name: 'Name', email: 'name@example.com', userId: 'abc1', password: '1234', role: 'admin' },
    { id: 2, name: 'Name', email: 'name@example.com', userId: 'abc2', password: '1234', role: 'admin' },
    { id: 3, name: '이름', email: 'alice@example.com', userId: 'abc3', password: '1234', role: 'admin' },
  ]);


  return (
    <div className='UserManager'>
      <h1>User Manager</h1>
      <div className='search-bar'>
        <Input type='search' placeholder='검색어를 입력하세요'
          className='mb-3' />
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>userId</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.userId}</td>
              <td><Button color='primary' onClick={() => openUserModal(user)}>정보보기</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

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