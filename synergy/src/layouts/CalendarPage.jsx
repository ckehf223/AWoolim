import React, { useState } from "react";
import Calendar from "react-calendar";
import "/src/css/calendarpage.css";

function CalendarPage() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 현재 시각을 00:00:00으로 설정하여 오늘 날짜만 가져옴

  const [value, onChange] = useState(today); // 초기값을 오늘 날짜로 설정
  const [events, setEvents] = useState({});

  const handleEventChange = (date, event) => {
    setEvents({
      ...events,
      [date.toDateString()]: event.target.value,
    });
  };

  const tileDisabled = ({ date, view }) => {
    if (view === "month") {
      return date < today; // 오늘 이전 날짜는 비활성화
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toDateString();
      const hasEvent = !!events[dateString]; // events[dateString]이 truthy 값인지 확인

      return (
        <div
          className={`event-indicator ${hasEvent ? "has-event" : ""}`}
          title={events[dateString]}
        >
          {hasEvent && "•"} {/* 일정이 있는 경우에만 빨간 점 표시 */}
        </div>
      );
    }
  };

  return (
    <section className="calendar-page">
      <h2>모임 일정</h2>
      <Calendar
        onChange={onChange}
        value={value}
        tileDisabled={tileDisabled} // 비활성화 로직 적용
        tileContent={tileContent}
      />
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
