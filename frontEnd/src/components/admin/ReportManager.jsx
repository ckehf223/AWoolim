import React, { useEffect, useState } from 'react'
import '/src/css/admin/ReportManager.css'
import { Table, Input, Button, Label, Col, FormGroup } from 'reactstrap'
import PaginationComponent from '/src/components/admin/PaginationComponent'
import useModal from '/src/common/useModal'
import ModalComponent from '/src/components/admin/ModalComponent'
import instance from '/src/common/auth/axios'

const ReportManager = () => {

  // 신고 목록
  const [reports, setReports] = useState([]);
  // 검색 결과를 담을 상태
  const [filteredReports, setFilteredReports] = useState(reports);

  // 모달 상태 토글함수 가져오는 커스텀 훅
  const { isModalOpen, toggleModal } = useModal();
  const { isModalOpen: isDetailModalOpen, toggleModal: toggleDetailModal } = useModal();

  // 선택된 신고 저장
  const [selectedReport, setSelectedReport] = useState(null);

  //모달에 입력된 메시지 저장
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await instance.get('/admin/report/list');
        setReports(response.data);
        setFilteredReports(response.data);
      } catch (error) {
        console.error('Error fetching reports : ', error);
      }
    }
    fetchReports();
  }, [])

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
  const [searchColumn, setSearchColumn] = useState('userId');

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

  // 신고 상태 업데이트
  const handleUpdate = async (result, resultMessage) => {
    if (selectedReport) {
      try {
        await instance.post('/admin/report/update', {
          reportNo: selectedReport.reportNo,
          userId: selectedReport.userId,
          targetId: selectedReport.targetId,
          content: selectedReport.content,
          regDate: selectedReport.regDate,
          result,
          resultMessage
        });
        const updateReports = reports.map(report =>
          report.reportNo === selectedReport.reportNo ? { ...report, result, resultMessage } : report
        );
        setReports(updateReports);
        setFilteredReports(updateReports);
        toggleModal();
      } catch (error) {
        console.error('Error updating report : ', error);
      }
    }
  }

  // 신고 삭제
  const handleDelete = async () => {
    if (selectedReport) {
      try {
        await instance.post('/admin/report/delete', { reportNo: selectedReport.reportNo });
        setReports(reports.filter(report => report.reportNo !== selectedReport.reportNo));
        setFilteredReports(filteredReports.filter(report => report.reportNo !== selectedReport.reportNo));
        toggleModal();
      } catch (error) {
        console.error('Error deleting report : ', error);
      }
    }
  }

  // 신고 조치 모달 열기
  const openReportModal = (reports) => {
    setSelectedReport(reports);
    setMessage('');
    toggleModal();
  }

  // 신고 상세보기 모달 열기
  const openDetailModal = (reports) => {
    setSelectedReport(reports);
    toggleDetailModal();
  }

  // onSend
  const handleSend = () => {
    handleUpdate(selectedReport.result, message);
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
              <option value="userId">신고자</option>
              <option value="targetId">신고대상</option>
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
            <th>신고번호</th>
            <th>신고자</th>
            <th>신고대상</th>
            <th>신고내용</th>
            <th>신고일</th>
            <th>상태</th>
            <th className='action-column'>조치</th>
            <th className='action-column'>상세정보</th>
          </tr>
        </thead>

        <tbody>
          {
            currentReports.map(reports => (
              <tr key={reports.reportNo}>
                <th scope='row'>{reports.reportNo}</th>
                <td>{reports.userId}</td>
                <td>{reports.targetId}</td>
                <td>{reports.content}</td>
                <td>{new Date(reports.regDate).toLocaleDateString()}</td>
                <td className={reports.result === 1 ? 'warning' : reports.result === -1 ? 'pass' : 'before'}
                >{reports.result === 1 ? '경고처리' : reports.result === -1 ? '넘어감' : '처리전'}</td>
                <td><Button outline color='secondary' onClick={() => openReportModal(reports)}>조치하기</Button></td>
                <td><Button outline color="primary" onClick={() => openDetailModal(reports)}>상세보기</Button></td>
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

      {/* 신고 상세보기 모달 */}
      <ModalComponent
        isOpen={isDetailModalOpen}
        toggle={toggleDetailModal}
        title="신고 상세"
        inputVisible={false}
      >
        {
          selectedReport && (
            <div className='modal-content'>
              <div>신고자 : {selectedReport.userId}</div>
              <div>신고대상 : {selectedReport.targetId}</div>
              <div>신고내용 : {selectedReport.content}</div>
              <div>신고일 : {new Date(selectedReport.regDate).toLocaleDateString()}</div>
              <div>처리 상태 : {selectedReport.result === 1 ? '경고' : selectedReport.result === -1 ? '넘어감' : '처리전'}</div>
              <div>처리 결과 메세지 : {selectedReport.resultMessage}</div>
            </div>
          )
        }
      </ModalComponent>

      {/* 신고 조치하기 모달 */}
      <ModalComponent
        isOpen={isModalOpen}
        toggle={toggleModal}
        title="신고 조치"
        inputVisible={true}
        onSend={handleSend}
      >
        {
          selectedReport && (
            <div className='modal-content'>
              <div>신고자 : {selectedReport.userId}</div>
              <div>신고대상 : {selectedReport.targetId}</div>
              <div>내용 : {selectedReport.content}</div>
              <div>신고일 : {new Date(selectedReport.regDate).toLocaleDateString()}</div>
              <div>상태 : {selectedReport.result === 1 ? '경고' : selectedReport.result === -1 ? '넘어감' : '처리전'}</div>
              <Input type='textarea' placeholder='처리 결과 메시지' value={message} onChange={(e) => setMessage(e.target.value)}></Input>
              <div className='modal-buttons'>
                <Button outline color="danger" onClick={() => handleUpdate(1, message)}>경고</Button>
                <Button outline color="success" onClick={() => handleUpdate(-1, message)}>넘어감</Button>
                <Button outline color="secondary" onClick={handleDelete}>삭제</Button>
              </div>
            </div>
          )
        }
      </ModalComponent>
    </div >
  )
}

export default ReportManager