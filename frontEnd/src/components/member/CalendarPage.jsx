import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "/src/css/member/calendarpage.css";
import { useNavigate, useParams } from "react-router-dom";
import instance from "/src/common/auth/axios";
import { useAuth } from "/src/common/AuthContext";

function CalendarPage() {
  const param = useParams(); // URL 파라미터에서 클럽 번호 가져오기
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 현재 시각을 00:00:00으로 설정하여 오늘 날짜만 가져옴

  const [value, onChange] = useState(today); // 초기값을 오늘 날짜로 설정
  const [data, setData] = useState({});
  const [events, setEvents] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [managerId, setManagerId] = useState('');
  const { loginId } = useAuth();
  const nav = useNavigate();

  const daysOfWeek = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  useEffect(() => {
    fetchClubSchedules();
    clubMasterId();
  }, [param.no]);

  const clubMasterId = async () => {
    try {
      const response = await instance.get(`/api/club/clubMasterId/${param.no}`);
      setManagerId(response.data);
    } catch (error) {
      console.error("모임장 아이디 가져오는 중 오류 발생" + error);
    }
  };

  const fetchClubSchedules = async () => {
    try {
      const response = await instance.get(
        `/api/mypage/clubSchedule/${param.no}`
      );
      const fetchedEvents = {};
      response.data.forEach((schedule) => {
        const dates = parseDateFromString(schedule.dday);
        dates.forEach((date) => {
          const dateString = date.toDateString();

          if (!fetchedEvents[dateString]) {
            fetchedEvents[dateString] = [];
          }
          fetchedEvents[dateString].push(schedule.content);
        });
      });

      setEvents(fetchedEvents);
      setIsLoading(false);
    } catch (error) {
      console.error("클럽 일정 로딩 중 오류", error);
      setIsLoading(false);
    }
  };

  const parseDateFromString = (dateString) => {
    const dates = [];

    const ddayArray = Array.isArray(dateString)
      ? dateString
      : dateString.split(", ");

    ddayArray.forEach((dday) => {
      if (daysOfWeek.includes(dday)) {
        const today = new Date();
        const dayIndex = daysOfWeek.indexOf(dday);
        const difference = dayIndex - today.getDay();
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + difference);
        dates.push(targetDate);
        return;
      }

      // 숫자 문자열인지 확인
      if (!isNaN(dday)) {
        console.log(`Detected numeric date string: ${dday}`);
      } else {
        dates.push(new Date());
        return;
      }
      const length = dday.length;
      let day, month, year;

      if (length === 8) {
        year = parseInt(dday.slice(0, 4), 10);
        month = parseInt(dday.slice(4, 6), 10) - 1;
        day = parseInt(dday.slice(6, 8), 10);
      } else if (length === 6) {
        const currentYear = new Date().getFullYear();
        year =
          parseInt(dday.slice(0, 2), 10) + (currentYear - (currentYear % 100));
        month = parseInt(dday.slice(2, 4), 10) - 1;
        day = parseInt(dday.slice(4, 6), 10);
      } else if (length === 4) {
        year = new Date().getFullYear();
        month = parseInt(dday.slice(0, 2), 10) - 1;
        day = parseInt(dday.slice(2, 4), 10);
      } else {
        dates.push(new Date());
        return;
      }

      const parsedDate = new Date(year, month, day);
      dates.push(parsedDate);
    });

    return dates;
  };

  const handleEventChange = (date, event) => {
    const dateString = date.toDateString();
    setEvents({
      ...events,
      [dateString]: [event.target.value],
    });

    setData({
      ...data,
      [formatDate(date)]: event.target.value,
    });
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      return date < today;
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toDateString();
      if (events[dateString]) {
        return "event-date";
      }
    }
    return null;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const saveCalendar = () => {
    try {
      if (data && Object.keys(data).length > 0) {
        instance.post(`/api/mypage/clubSchedule/register/${param.no}`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        window.location.reload();
      } else {
        alert("저장할 데이터가 없습니다");
      }
    } catch (error) {
      console.error("모임 스케쥴 등록중 오류발생" + error);
    }
  }

  const deleteCalendar = (date) => {
    const fmDate = formatDate(date);
    try {
      instance.post(`/api/mypage/clubSchedule/delete`, {
        clubNo: param.no,
        day: fmDate
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      window.location.reload();
    } catch (error) {
      console.error("모임 스케쥴 삭제중 오류발생" + error)
    }

  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="section-container2">
      <div className="button-group">
        <button
          onClick={() => {
            nav(`/includeclub/detailInfo/${param.no}`);
          }}
        >
          상세 정보
        </button>
        <button
          className={"active"}
          onClick={() => {
            nav(`/includeclub/calendar/${param.no}`);
          }}
        >
          캘린더{" "}
        </button>
        <button
          onClick={() => {
            nav(`/includeclub/photoGallery/${param.no}`);
          }}
        >
          {" "}
          사진첩{" "}
        </button>
      </div>
      <div className="content">
        <section className="calendar-page">
          <h4>모임 일정</h4>

          <Calendar
            onChange={onChange}
            value={value}
            tileDisabled={tileDisabled}
            tileClassName={tileClassName}
          />
          {value ? (
            <div className="event-details">
              <div>
                <h3>{value.toDateString()}</h3>
                <textarea
                  value={events[value.toDateString()]?.join(", ") || ""}
                  onChange={(e) => handleEventChange(value, e)}
                  placeholder="모임 일정을 입력하세요." readOnly={managerId !== loginId} />
                {managerId === loginId && <button onClick={() => { saveCalendar() }}>저장</button>}
                {managerId === loginId && events[value.toDateString()] != null && <button onClick={() => { deleteCalendar(value) }}>삭제</button>};
              </div>
            </div>
          ) : (
            <div className="event-details">
              <div>
                <h3>{value.toDateString()}</h3>
                <textarea
                  value={events[value.toDateString()]?.join(", ") || ""}
                  onChange={(e) => handleEventChange(value, e)}
                  placeholder="모임 일정을 입력하세요." readOnly={managerId !== loginId}
                />
                {managerId === loginId && <button onClick={() => { saveCalendar() }}>저장</button>}
              </div>
            </div>
          )}
        </section>
      </div >
    </section >
  );
}

export default CalendarPage;
