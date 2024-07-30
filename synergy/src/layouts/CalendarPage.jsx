import React, { useState } from "react";
import Calendar from "react-calendar"; // react-calendar 라이브러리 사용
import "/src/css/calendarpage.css";

function CalendarPage() {
  const [value, onChange] = useState(new Date()); // 선택된 날짜 상태
  const [events, setEvents] = useState({}); // 날짜별 이벤트 저장 객체

  const handleEventChange = (date, event) => {
    setEvents({
      ...events,
      [date.toDateString()]: event.target.value,
    });
  };

  const tileContent = ({ date, view }) => {
    if (view === "month" && events[date.toDateString()]) {
      return (
        <div className="event-indicator" title={events[date.toDateString()]}>
          •
        </div>
      );
    }
  };

  return (
    <section className="calendar-page">
      <h2>모임 일정</h2>
      <Calendar onChange={onChange} value={value} tileContent={tileContent} />
      {value && (
        <div className="event-input">
          <h3>{value.toDateString()}</h3>
          <textarea
            value={events[value.toDateString()] || ""}
            onChange={(e) => handleEventChange(value, e)}
            placeholder="모임 일정을 입력하세요."
          />
        </div>
      )}
    </section>
  );
}

export default CalendarPage;
