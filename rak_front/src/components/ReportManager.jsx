import React from 'react'
import './ReportManager.css'
import { Table, Input, Button, Label, Col, FormGroup } from 'reactstrap'
import { useState } from 'react'
import PaginationComponent from './PaginationComponent'
import useModal from './useModal'
import ModalComponent from './ModalComponent'

const ReportManager = () => {

  const initialReports = [
    { id: 1, reporter: '최성락', target: '이석진', date: '2024-07-25', result: '처리전' },
    { id: 2, reporter: '최성락', target: '이석진2', date: '2024-07-25', result: '처리전' },
    { id: 3, reporter: '최성락', target: '이석진3', date: '2024-07-25', result: '처리전' },
    { id: 4, reporter: '최성락', target: '이석진', date: '2024-07-25', result: '처리전' },
    { id: 5, reporter: '최성락', target: '이석진2', date: '2024-07-25', result: '처리전' },
    { id: 6, reporter: '최성락', target: '이석진3', date: '2024-07-25', result: '처리전' },
    { id: 7, reporter: '최성락', target: '이석진', date: '2024-07-25', result: '처리전' },
    { id: 8, reporter: '최성락', target: '이석진2', date: '2024-07-25', result: '처리전' },
    { id: 9, reporter: '최성락', target: '이석진3', date: '2024-07-25', result: '처리전' },
    { id: 10, reporter: '최성락', target: '이석진', date: '2024-07-25', result: '처리전' },
    { id: 11, reporter: '최성락', target: '이석진2', date: '2024-07-25', result: '처리전' },
    { id: 12, reporter: '최성락', target: '이석진3', date: '2024-07-25', result: '처리전' },
    { id: 13, reporter: '최성락', target: '이석진', date: '2024-07-25', result: '처리전' },
    { id: 14, reporter: '최성락', target: '이석진2', date: '2024-07-25', result: '처리전' },
    { id: 15, reporter: '최성락', target: '이석진3', date: '2024-07-25', result: '처리전' },
    { id: 16, reporter: '최성락', target: '이석진', date: '2024-07-25', result: '처리전' },
    { id: 17, reporter: '최성락', target: '이석진2', date: '2024-07-25', result: '처리전' },
    { id: 18, reporter: '최성락', target: '이석진3', date: '2024-07-25', result: '처리전' },
    { id: 19, reporter: '최성락', target: '이석진', date: '2024-07-25', result: '처리전' },
    { id: 20, reporter: '최성락', target: '이석진2', date: '2024-07-25', result: '처리전' },
    { id: 21, reporter: '최성락', target: '이석진3', date: '2024-07-25', result: '처리전' },
    { id: 22, reporter: '최성락', target: '이석진', date: '2024-07-25', result: '처리전' },
    { id: 23, reporter: '최성락', target: '이석진2', date: '2024-07-25', result: '처리전' },
    { id: 24, reporter: '최성락', target: '이석진3', date: '2024-07-25', result: '처리전' },
  ]

  // 초기 신고 데이터 초기화
  const [reports, setReports] = useState(initialReports);
  // 검색 결과를 담을 상태
  const [filteredReports, setFilteredReports] = useState(initialReports);

  // 모달 상태 토글함수 가져오는 커스텀 훅
  const { isModalOpen, toggleModal } = useModal();

  // 선택된 신고 저장
  const [selectedReport, setSelectedReport] = useState(null);

  //모달에 입력된 메시지 저장
  const [message, setMessage] = useState('');

  // -------------------------페이지네이션-------------------
  const itemsPerPage = 10;                                        //페이지당 아이템 수
  const [currentPage, setCurrentPage] = useState(1);              //현재 페이지
  const totalPages = Math.ceil(reports.length / itemsPerPage);    //총 페이지 수 계산

  //페이지 변경
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  // 현재 페이지에 첫 번째와 마지막 아이템 인덱스
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // 현재 페이지에 보여줄 신고 목록
  const currentReports = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  // -------------------------페이지네이션-------------------

  //-------------------------검색기능-------------------------
  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumn, setSearchColumn] = useState('reporter');

  // 검색 버튼 클릭 시 호출
  const handleSearch = () => {
    if (searchTerm === '') {
      setFilteredReports(reports);
    } else {
      const newFilteredReports = reports.filter(report =>
        report[searchColumn].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReports(newFilteredReports);
    }
    setCurrentPage(1); // 검색 결과가 갱신될 때 페이지를 첫 번째로 설정
  };
  //-------------------------검색기능-------------------------

  // 모달에서 메시지 전송
  const handleSendMessage = () => {
    const updatedReports = reports.map(report =>
      report.id === selectedReport.id ? { ...report, result: '처리완료', message } : report
    );
    setReports(updatedReports);
    setFilteredReports(updatedReports);
    toggleModal();
    setMessage(''); // 메시지 초기화
  }

  // 처리하기 
  const handleResultChange = (report) => {
    setSelectedReport(report);
    setMessage(''); // 이전 메시지 초기화
    toggleModal();
  }
  return (
    <div className='ReportManager'>
      {/* ************************검색바************************ */}
      <div className='search-bar'>
        <FormGroup row>
          <Label for='searchColumn' sm={2}></Label>
          <Col sm={3}>
            <Input
              type='select'
              name='searchColumn'
              id='searchColumn'
              value={searchColumn}
              onChange={(e) => setSearchColumn(e.target.value)}
            >
              <option value="reporter">신고자</option>
              <option value="target">신고대상</option>
              <option value="result">처리결과</option>
            </Input>
          </Col>
          <Col sm={4}>
            <Input
              type='search'
              placeholder='검색어를 입력하세요'
              className='mb-3'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col sm={3}>
            <Button color='primary' onClick={handleSearch}>검색하기</Button>
          </Col>
        </FormGroup>
      </div>
      {/* ************************검색바************************ */}

      {/* ************************테이블************************ */}
      <Table bordered>

        <thead>
          <tr>
            <th>#</th>
            <th>신고자</th>
            <th>신고대상</th>
            <th>신고 날짜</th>
            <th>처리결과</th>
            <th>처리</th>
          </tr>
        </thead>

        <tbody>
          {
            currentReports.map(reports => (
              <tr key={reports.id}>
                <th scope='row'>{reports.id}</th>
                <td>{reports.reporter}</td>
                <td>{reports.target}</td>
                <td>{reports.date}</td>
                <td>{reports.result}</td>
                <td className='action-column'>
                  <Button outline color={reports.result === '처리전' ? 'warning' : 'success'} onClick={() => handleResultChange(reports)}>
                    {reports.result === '처리전' ? '처리하기' : '처리완료'}
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      {/* ************************테이블************************ */}

      {/* 페이징 */}
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* 모달 */}
      <ModalComponent
        isOpen={isModalOpen}
        toggle={toggleModal}
        title="신고 처리"
        onSend={handleSendMessage}
        inputVisible={true}
      >
        <div>
          <p>{selectedReport && `신고자: ${selectedReport.reporter}, 대상자: ${selectedReport.target}`}</p>
          <Input
            type="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
        </div>
      </ModalComponent>
    </div >
  )
}

export default ReportManager