import React from 'react'
import './ClubManager.css'
import { Table, Input } from 'reactstrap'

const ClubManager = () => {
  const club = [
    { id: 1, category: '운동', name: '운동모임', people: 10, date: '2024-07-25', regular: '정기' },
    { id: 2, category: '교양', name: '교양모임', people: 20, date: '2024-07-25', regular: '일회' },
    { id: 3, category: '운동', name: '운동모임', people: 30, date: '2024-07-25', regular: '정기' },
  ]

  return (
    <div className='ClubManager'>
      <h1>Club Manager</h1>
      <div className='search-bar'>
        <Input type='search' placeholder='검색어를 입력하세요'
          className='mb-3' />
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>카테고리</th>
            <th>모임이름</th>
            <th>참여인원</th>
            <th>개설일</th>
            <th>정기/일회</th>
          </tr>
        </thead>
        <tbody>
          {club.map((club) => (
            <tr key={club.id}>
              <th scope='row'>{club.id}</th>
              <td>{club.category}</td>
              <td>{club.name}</td>
              <td>{club.people}</td>
              <td>{club.date}</td>
              <td>{club.regular}</td>
            </tr>
          ))

          }
        </tbody>
      </Table>
    </div>
  )
}

export default ClubManager  