import React, { useContext, useReducer, useState } from 'react';
import '../../assets/style/calendar.scss';
import { Box, BaseHeaderLayout, Button } from "@strapi/design-system"
import { ArrowLeft, ArrowRight, Refresh } from '@strapi/icons';
import { daysOfWeek, datesForGrid, labelMonth } from './calendar'
import { changeMonth, resetMonth } from '../../utils/reducers';
import { useDispatch, useSelector } from 'react-redux';
import getTrad from '../../utils/getTrad'
import { useIntl } from 'react-intl';



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
    <div className='calendar-container'>
      <Box padding={4}>
        {renderControls()}
      </Box>
      <div className='calendar-grid'>
        {renderTableHeader()}
        {renderTableBody()}
      </div>
    </div>
  </>
}

function renderControls(){
  const currentDate = useSelector((state) => state.currentDate);
  const dispatch = useDispatch();

  const handleChangeMonth = (value) => {
    dispatch(changeMonth(value));
  };

  const resetCalendarView = () => {
    dispatch(resetMonth());
  };

  const { formatMessage } = useIntl();

  return <>
    <div className='calendar-controls'>
      <div className='navigate'>
        <Button variant='tertiary' size="L" onClick={() => handleChangeMonth(-1)} startIcon={<ArrowLeft />}>{formatMessage({id: getTrad('calendar.controls.previous')})}</Button>
      </div>
      <div className='label'>
        {labelMonth(currentDate)}
      </div>
      <div className='navigate'>
        <Button variant='tertiary' size="L" onClick={resetCalendarView} endIcon={<Refresh />}>{formatMessage({id: getTrad('calendar.controls.jump_to_today')})}</Button>
        <Button variant='tertiary' size="L" onClick={() => handleChangeMonth(1)} endIcon={<ArrowRight />}>{formatMessage({id: getTrad('calendar.controls.next')})}</Button>
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
