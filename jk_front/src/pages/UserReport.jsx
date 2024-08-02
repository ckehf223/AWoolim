import { Link } from 'react-router-dom';
import './UserReport.css'
import Calendar from '../components/Calendar';
import { useRef, useState } from 'react';
const oldData = [
  {
    no: 1,
    targetId: 'ckhef223',
    date: '2024-05-11',
    success: '처리 중',
  },
  {
    no: 2,
    targetId: 'kim1234',
    date: '2024-07-12',
    success: '처리완료',
  },
  {
    no: 3,
    targetId: 'lee123',
    date: '2024-07-13',
    success: '처리 중',
  },
  {
    no: 4,
    targetId: 'hong123',
    date: '2024-06-20',
    success: '처리완료',
  },
]
const complete = oldData.filter((data) => {
  return data.success === '처리완료' ? data : '';
}).length;

const fail = oldData.filter((data) => {
  return data.success === '처리 중' ? data : '';
}).length;

const UserReport = () => {

  const [initialDate, setInitialDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [answerVisible, setAnswerVisible] = useState(0);
  const [data, setData] = useState(oldData);
  const [selected, setSelected] = useState(1);
  const ref = useRef(1);
  const onClickAnswer = (e) => {
    if (answerVisible === e)
      setAnswerVisible(0);
    else { setAnswerVisible(e); }
    console.log(e);
  }

  const formatDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onSearchData = () => {
    const formattedInitialDate = formatDateString(initialDate);
    const formattedEndDate = formatDateString(endDate);
    setData(() => {
      return oldData.filter((data) => {
        return (
          data.date >= formattedInitialDate && data.date <= formattedEndDate
        );
      });
    });
  };

  const onClickNav = (e) => {
    setSelected(e);
    switch (e) {
      case 1:
        setData(oldData);
        break;
      case 2:
        setData(() => {
          return oldData.filter((data) => data.success === '처리 중')
        })
        break;
      case 3:
        setData(() => {
          return oldData.filter((data) => data.success === '처리완료')
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
              <p className='UserReportTotalCount'>{oldData.length}</p>
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
              minDate={initialDate} />
            <button onClick={onSearchData}>조회</button>
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

            {data.map((report) => {
              return (
                <div className='UserReportInfoArea' key={report.no} onClick={() => { onClickAnswer(report.no) }} >
                  <div className='UserReportMainBox' >
                    <div>{report.no}</div>
                    <div>{report.targetId}</div>
                    <div>{report.date}</div>
                    <div>{report.success}</div>
                  </div>
                  <div className={`UserReportContentArea${answerVisible === report.no ? 'Show' : ''}`} >
                    <div>
                      <div className='UserReportContent'>신고내용 : </div>
                      <span>미친 사람이 날뛰고 있어요 도와주세요</span>
                    </div>
                    <div>
                      <div>처리답변 : </div>
                      <span>미친 사람이라 판단되어 제제를 가하였습니다.</span>
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