import '/src/css/member/UserReport.css'
import Calendar from '/src/components/member/Calendar';
import { useEffect, useRef, useState } from 'react';
import instance from '/src/common/auth/axios';

const today = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 3);

const UserReport = () => {

  const [initialDate, setInitialDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(today);
  const [answerVisible, setAnswerVisible] = useState(0);
  const [data, setData] = useState([]);
  const [sortData, setSortData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [selected, setSelected] = useState(1);
  const [complete, setComplete] = useState();
  const [fail, setFail] = useState();


  useEffect(() => {
    const getMyReport = async () => {
      try {
        const response = await instance.get("http://localhost:8080/api/report/reportList",
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        setData(response.data);
        setSortData(response.data);
        setReportData(response.data);
        setComplete(() => response.data.filter((data) => data.RESULT === 1 || data.RESULT === -1).length);
        setFail(() => response.data.filter((data) => data.RESULT === 0).length)
      } catch (error) {
        console.error("마이페이지 신고내역 로딩 중 오류" + error)
      }
    }
    getMyReport();
  }, [])

  const formatDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parseDate = (dateStr) => {
    const [year, month, day] = dateStr.split('.').map(Number);
    return new Date(`20${year}`, month - 1, day);
  };


  const onSearchData = () => {
    const formattedInitialDate = formatDateString(initialDate);
    const formattedEndDate = formatDateString(endDate);
    setData(() => {
      return sortData.filter((data) => {
        const reportDate = parseDate(data.REGDATE);
        return (
          reportDate >= new Date(formattedInitialDate) && reportDate <= new Date(formattedEndDate)
        );
      });
    });
  };

  const onClickAnswer = (e) => {
    if (answerVisible === e)
      setAnswerVisible(0);
    else { setAnswerVisible(e); }
  }

  const onClickNav = (e) => {
    setSelected(e);
    switch (e) {
      case 1:
        setData(reportData);
        break;
      case 2:
        setData(() => {
          return reportData.filter((data) => data.RESULT === 0);
        })
        setSortData(() => {
          return reportData.filter((data) => data.RESULT === 0);
        })
        break;
      case 3:
        setData(() => {
          return reportData.filter((data) => data.RESULT === 1 || data.RESULT === -1);
        })
        setSortData(() => {
          return reportData.filter((data) => data.RESULT === 1 || data.RESULT === -1);
        })
        break;
    }
  }

  return (
    <>
      <div className="UserReport">
        <div className='UserReportWrap'>
          <div className='UserReportTitle'>
            <h3>신고 내역</h3>
          </div>
          <div className='UserReportHeaderArea'>
            <div className={`UserReportHeaderNav${selected === 1 ? 'selected' : ''}`} onClick={() => { onClickNav(1) }}>
              <p className='UserReportTotalCount'>{data.length}</p>
              <p className='UserReportTotalMg'>총 신고</p>
            </div>
            <div className={`UserReportHeaderNav${selected === 2 ? 'selected' : ''}`} onClick={() => { onClickNav(2) }}>
              <p className='UserReportTotalCount'>{fail}</p>
              <p className='UserReportTotalMg'>처리 중</p>
            </div>
            <div className={`UserReportHeaderNav${selected === 3 ? 'selected' : ''}`} onClick={() => { onClickNav(3) }}>
              <p className='UserReportTotalCount'>{complete}</p>
              <p className='UserReportTotalMg'>처리 완료</p>
            </div>
          </div>
          <div className='UserReportCalendarArea'>
            <b>기간조회</b>
            <Calendar
              selectedDate={initialDate}
              onChangeDate={setInitialDate}
              maxDate={endDate}
            />
            <span span > ~ </span>
            <Calendar
              selectedDate={endDate}
              onChangeDate={setEndDate}
              minDate={initialDate}
              maxDate={today} />
            <button onClick={() => { onSearchData() }}>조회</button>
          </div>
          <div className='UserReportMainArea'>
            <div className='UserReportContentBorder'>
              <div className='UserReportMainHeader'>
                <div>번호</div>
                <div>신고 대상</div>
                <div>신고 날짜</div>
                <div>처리 결과</div>
              </div>
            </div>

            {data.map((report, index) => {
              return (
                <div className='UserReportInfoArea' key={report.REPORTNO} onClick={() => { onClickAnswer(report.REPORTNO) }} >
                  <div className='UserReportMainBox' >
                    <div>{index + 1}</div>
                    <div>{report.TARGETNAME}</div>
                    <div>{report.REGDATE}</div>
                    <div>{report.RESULT === 0 ? '처리중' : '처리완료'}</div>
                  </div>
                  <div className={`UserReportContentArea${answerVisible === report.REPORTNO ? 'Show' : ''}`} >
                    <div>
                      <div className='UserReportContent'>신고내용 : </div>
                      <span>{report.CONTENT}</span>
                    </div>
                    <div>
                      <div>처리답변 : </div>
                      <span>{report.RESULTMESSAGE}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div >
    </>
  )
}
export default UserReport;