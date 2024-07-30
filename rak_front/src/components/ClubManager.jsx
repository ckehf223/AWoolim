import React, { useContext, useState } from 'react'
import './ClubManager.css'
import { Table, Input } from 'reactstrap'
import { Link } from 'react-router-dom'
import { ClubContext } from '../ClubContext'
import PaginationComponent from './PaginationComponent'

const ClubManager = () => {
  const { clubs } = useContext(ClubContext);

  // -------------------------페이지네이션-------------------
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(clubs.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClubs = clubs.slice(indexOfFirstItem, indexOfLastItem);
  //-------------------------페이지네이션-------------------

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
          {currentClubs.map(club => (
            <tr key={club.id}>
              <th scope='row'>{club.id}</th>
              <td>{club.category}</td>
              <td><Link to={{
                pathname: `/club/${club.id}`,
                state: { club } // club 객체를 전달
              }}>{club.name}</Link></td>
              <td>{club.people}</td>
              <td>{club.date}</td>
              <td>{club.regular}</td>
            </tr>
          ))

          }
        </tbody>
      </Table>
      <PaginationComponent
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

    </div>
  )
}

export default ClubManager  