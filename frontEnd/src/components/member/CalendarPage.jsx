import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "/src/css/member/calendarpage.css";
import { useParams } from "react-router-dom";

function CalendarPage() {
  const { no: clubNo } = useParams(); // URL 파라미터에서 클럽 번호 가져오기
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 현재 시각을 00:00:00으로 설정하여 오늘 날짜만 가져옴

  const [value, onChange] = useState(today); // 초기값을 오늘 날짜로 설정
  const [events, setEvents] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 요일 문자열을 처리하여 각 요일에 맞는 일정 저장
  const daysOfWeek = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  // 날짜 문자열을 날짜 객체로 변환하는 함수
  const parseDateFromString = (dateString) => {
    console.log(`Parsing date from string: ${dateString}`);

    const dates = []; // 날짜들을 저장할 배열

    // dday 값이 배열인지 확인하고, 배열이 아닌 경우에도 배열로 처리
    const ddayArray = Array.isArray(dateString)
      ? dateString
      : dateString.split(", ");

    ddayArray.forEach((dday) => {
      // dday 값이 요일 문자열인지 확인
      if (daysOfWeek.includes(dday)) {
        console.log(`Detected day of the week: ${dday}`);
        const today = new Date();
        const dayIndex = daysOfWeek.indexOf(dday);
        const difference = dayIndex - today.getDay();
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + difference);
        console.log(`Parsed day of the week into date: ${targetDate}`);
        dates.push(targetDate);
        return;
      }

      // 숫자 문자열인지 확인
      if (!isNaN(dday)) {
        console.log(`Detected numeric date string: ${dday}`);
      } else {
        console.warn(`Invalid date format: ${dday}`);
        dates.push(new Date()); // 유효하지 않은 형식인 경우 현재 날짜 추가
        return;
      }

      const length = dday.length;
      let day, month, year;

      if (length === 8) {
        // YYYYMMDD 형식
        year = parseInt(dday.slice(0, 4), 10);
        month = parseInt(dday.slice(4, 6), 10) - 1; // JavaScript의 월은 0부터 시작
        day = parseInt(dday.slice(6, 8), 10);
        console.log(
          `Parsed date (YYYYMMDD): year=${year}, month=${month + 1}, day=${day}`
        );
      } else if (length === 6) {
        // YYMMDD 형식
        const currentYear = new Date().getFullYear();
        year =
          parseInt(dday.slice(0, 2), 10) + (currentYear - (currentYear % 100)); // 현재 연도를 기준으로 계산
        month = parseInt(dday.slice(2, 4), 10) - 1; // JavaScript의 월은 0부터 시작
        day = parseInt(dday.slice(4, 6), 10);
        console.log(
          `Parsed date (YYMMDD): year=${year}, month=${month + 1}, day=${day}`
        );
      } else if (length === 4) {
        // MMDD 형식
        year = new Date().getFullYear(); // 올해를 기본값으로 설정
        month = parseInt(dday.slice(0, 2), 10) - 1; // JavaScript의 월은 0부터 시작
        day = parseInt(dday.slice(2, 4), 10);
        console.log(
          `Parsed date (MMDD): year=${year}, month=${month + 1}, day=${day}`
        );
      } else {
        console.warn(`Invalid date format: ${dday}`);
        dates.push(new Date()); // 유효하지 않은 형식인 경우 현재 날짜 추가
        return;
      }

      const parsedDate = new Date(year, month, day);
      console.log(`Final parsed date: ${parsedDate}`);
      dates.push(parsedDate);
    });

    return dates;
  };

  // 클럽 일정 데이터 가져오기
  useEffect(() => {
    const fetchClubSchedules = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/mypage/mycreateclub/${clubNo}`
        );

        const fetchedEvents = {};
        response.data.forEach((schedule) => {
          console.log(`Processing schedule: ${JSON.stringify(schedule)}`);
          const dates = parseDateFromString(schedule.dday);
          dates.forEach((date) => {
            const dateString = date.toDateString();
            console.log(`Mapped date string: ${dateString}`);

            if (!fetchedEvents[dateString]) {
              fetchedEvents[dateString] = [];
            }
            fetchedEvents[dateString].push(schedule.content);
            console.log(`Updated events: ${JSON.stringify(fetchedEvents)}`);
          });
        });

        setEvents(fetchedEvents);
        setIsLoading(false);
      } catch (error) {
        console.error("클럽 일정 로딩 중 오류", error);
        setIsLoading(false);
      }
    };

    fetchClubSchedules();
  }, [clubNo]);

  const handleEventChange = (date, event) => {
    const dateString = date.toDateString();
    console.log(
      `Handling event change for date: ${dateString}, value: ${event.target.value}`
    );
    setEvents({
      ...events,
      [dateString]: [event.target.value],
    });
    console.log(`Updated events after change: ${JSON.stringify(events)}`);
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      return date < today; // 오늘 이전 날짜는 비활성화
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toDateString();
      if (events[dateString]) {
        return "event-date"; // 이벤트가 있는 날짜에 추가할 클래스
      }
    }
    return null;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="calendar-page">
      <h2>모임 일정</h2>
      <Calendar
        onChange={onChange}
        value={value}
        tileDisabled={tileDisabled} // 비활성화 로직 적용
        tileClassName={tileClassName} // 일정이 있는 날짜에 클래스 적용
      />
      {value && (
        <div className="event-details">
          <h3>{value.toDateString()}</h3>
          <textarea
            value={events[value.toDateString()]?.join(", ") || ""}
            onChange={(e) => handleEventChange(value, e)}
            placeholder="모임 일정을 입력하세요."
          />
        </div>
      )}
    </section>
  );
}

export default CalendarPage;
