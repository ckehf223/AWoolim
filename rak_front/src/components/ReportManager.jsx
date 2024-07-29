import React from 'react'
import './ReportManager.css'
import { Table, Input, Button } from 'reactstrap'
import { useState } from 'react'

const ReportManager = () => {

  const [reports, setReports] = useState([
    { id: 1, reporter: '최성락', target: '이석진', date: '2024-07-25', result: '처리중' },
    { id: 2, reporter: '최성락', target: '이석진2', date: '2024-07-25', result: '처리완료' },
    { id: 3, reporter: '최성락', target: '이석진3', date: '2024-07-25', result: '처리중' },
  ])

  const handleResultChange = (id) => {
    setReports(reports.map(reports => reports.id === id ? { ...reports, result: reports.result === '처리중' ? '처리완료' : '처리중' } : reports))
  }
  return (
    <div className='ReportManager'>
      <h1>Report Manager</h1>
      <div className='search-bar'>
        <Input type='search' placeholder="검색어를 입력하세요"
          className='mb-3' />
      </div>
      <Table bordered>

        <thead>
          <tr>
            <th>#</th>
            <th>신고자</th>
            <th>신고대상</th>
            <th>신고 날짜</th>
            <th>처리결과</th>
          </tr>
        </thead>

        <tbody>
          {
            reports.map(reports => (
              <tr key={reports.id}>
                <th scope='row'>{reports.id}</th>
                <td>{reports.reporter}</td>
                <td>{reports.target}</td>
                <td>{reports.date}</td>
                <td>{reports.result}</td>
                <td>
                  <Button color={reports.result === '처리중' ? 'warning' : 'success'} onClick={() => handleResultChange(reports.id)}>
                    {reports.result === '처리중' ? '완료' : '처리중으로 변경'}
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div >
  )
}

export default ReportManager