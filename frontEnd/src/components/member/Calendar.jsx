import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendar = ({ selectedDate, onChangeDate, minDate, maxDate }) => {

  return (
    <DatePicker className='DatePicker'
      dateFormat='yyyy-MM-dd'
      shouldCloseOnSelect
      minDate={minDate === '' ? new Date('2000-01-01') : minDate}
      maxDate={maxDate === '' ? new Date() : maxDate}
      selected={selectedDate}
      onChange={(date) => onChangeDate(date)}
    />
  );
};

export default Calendar;