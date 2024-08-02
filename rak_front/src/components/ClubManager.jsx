import React, { useContext, useState } from 'react'
import './ClubManager.css'
import { Table, Input, Label, Col, Button, FormGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import { ClubContext } from '../ClubContext'
import PaginationComponent from './PaginationComponent'

const ClubManager = () => {
  const { clubs } = useContext(ClubContext);
  const initialClubs = clubs;

  const [searchTerm, setSearchTerm] = useState('');                   //검색어 
  const [searchColumn, setSearchColumn] = useState('name');           //검색할 열
  const [filteredClubs, setFilteredClubs] = useState(initialClubs);   //필터링한 결과

  // -------------------------페이지네이션-------------------
  const itemsPerPage = 10;                                            //페이지당 아이템 수
  const [currentPage, setCurrentPage] = useState(1);                  //현재 페이지
  const totalPages = Math.ceil(clubs.length / itemsPerPage);          //총 페이지 수 계산

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  // 현재 페이지에 해당하는 아이템의 인덱스 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClubs = filteredClubs.slice(indexOfFirstItem, indexOfLastItem);
  //-------------------------페이지네이션-------------------

  //-------------------------검색기능-------------------------
  const handleSearch = () => {
    // 검색어가 없으면 모든 모임을 보여줌
    if (searchTerm === '') {
      setFilteredClubs(initialClubs);
    } else {
      const newFilteredClubs = initialClubs.filter(club =>
        club[searchColumn].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClubs(newFilteredClubs);
    }
    setCurrentPage(1); // 검색 결과가 갱신될 때 페이지를 첫 번째로 설정
  };
  //-------------------------검색기능-------------------------

  return (
    <div className='ClubManager'>
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
              <option value="name">모임 이름</option>
              <option value="category">카테고리</option>
              <option value="people">참여인원</option>
              <option value="date">개설일</option>
              <option value="regular">정기/일회</option>
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