import React from 'react'
import { useState } from 'react'
import { Table, Input, Button } from 'reactstrap'
import './UserManager.css'
import ModalComponent from './ModalComponent'
import useModal from './useModal'

const UserManager = () => {
  //모달상태
  const { isModalOpen, toggleModal } = useModal();
  const [selectedUser, setSelectedUser] = useState(null);

  const openUserModal = (user) => {
    setSelectedUser(user);
    toggleModal();
  }

  const users = [
    { id: 1, name: 'Name', email: 'name@example.com', role: 'user' },
    { id: 2, name: 'Name', email: 'name@example.com', role: 'User' },
    { id: 3, name: '이름', email: 'alice@example.com', role: 'user' },
  ];


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
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td><Button color='primary' onClick={() => openUserModal(user)}>정보보기</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalComponent isOpen={isModalOpen} toggle={toggleModal} title='유저정보' >
        <div>
          <div>이름: {selectedUser?.name}</div>
          <div>이메일: {selectedUser?.email}</div>
          <div>역할: {selectedUser?.role}</div>
        </div>
      </ModalComponent>

    </div>
  )
}

export default UserManager