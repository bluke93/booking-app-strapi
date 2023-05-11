import React, { useContext, useReducer, useState } from 'react';
import '../../assets/style/calendar.css';
import { Box, BaseHeaderLayout, Button } from "@strapi/design-system"
import { daysOfWeek, datesForGrid, labelMonth } from './calendar'
import { changeMonth, selectMonth } from '../../utils/reducers';
import { useDispatch, useSelector } from 'react-redux';


const Calendar = () => {
  return (
    <>
      <Box background="neutral100">
        <BaseHeaderLayout title="Appointments" subtitle="36 pending appointments found" as="h2" />
      </Box>
      <Box padding={8}>
        <Box hasRadius background="neutral0" shadow="tableShadow">
          {showCalendar()}
        </Box>
      </Box>
    </>
  );
};

function showCalendar(){
  return <>
    <Box padding={4}>
      {renderControls()}
    </Box>
    <div className='calendar-grid'>
      {renderTableHeader()}
      {renderTableBody()}
    </div>
  </>
}

function renderControls(){
  const dispatch = useDispatch();

  const handleChangeMonth = (value) => {
    dispatch(changeMonth(value));
  };

  const currentDate = useSelector((state) => state.currentDate);

  return <>
    <div className='calendar-controls'>
      <div className='navigate'>
        <Button variant='tertiary' onClick={() => handleChangeMonth(-1)}>Previous</Button>
      </div>
      <div className='label'>
        {labelMonth(currentDate)}
      </div>
      <div className='navigate'>
        <Button variant='tertiary' onClick={() => handleChangeMonth(1)}>Next</Button>
      </div>
    </div>
  </>
}

function renderTableHeader(){
  return <>
    {daysOfWeek().map((day, index) => {
      return <React.Fragment key={index}>
        <div className='header weekday' >
          {day.toUpperCase()}
        </div>
      </React.Fragment>
    })}
  </>
}


function renderTableBody(){
  const currentDate = useSelector((state) => state.currentDate);
  return <>
    {datesForGrid(currentDate).map((day, index) => {
      return <React.Fragment key={index}>
        <div className={`body weekday ${day.monthClass} ${day.todayClass ? 'today' : ''}`} key={index}>
          <p className='day'>{day.date}</p>
        </div>
      </React.Fragment>
    })}
  </>
}

export default Calendar;
