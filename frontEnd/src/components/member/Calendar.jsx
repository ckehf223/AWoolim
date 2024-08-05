import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ selectedDate, onChangeDate, minDate, maxDate }) => {
  // const [selectedDate1, setSelectedDate1] = useState(new Date());

  return (
    <DatePicker className='DatePicker'
      dateFormat='yyyy-MM-dd' // 날짜 형태
      shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
      minDate={minDate === '' ? new Date('2000-01-01') : minDate} // minDate 이전 날짜 선택 불가
      maxDate={maxDate === '' ? new Date() : maxDate} // maxDate 이후 날짜 선택 불가
      selected={selectedDate}
      onChange={(date) => onChangeDate(date)}
    />
  );
};

export default Calendar;