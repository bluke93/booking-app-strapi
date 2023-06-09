import { yearsToMonths, format, setDefaultOptions, eachDayOfInterval, startOfWeek, addDays, getMonth, getYear, addMonths } from "date-fns";
import { it, enGB } from 'date-fns/locale'

setDefaultOptions({ locale: retrieveLocale() })

function retrieveLocale(){
  const currentLocale = localStorage.getItem('strapi-admin-language');
  switch(currentLocale){
    case 'it': return it;
    case 'en': return enGB;
    default: return enGB;
  }
}

var gridSize = 42; //Total number of date boxes in the grid

var today = new Date();

var months = ()=>{
  let year = getYear(new Date())
  let result = [];
  for(let m = 0; m < yearsToMonths(1); m++){
    const date = new Date(year, m, 1);
    const formattedDate = format(date, 'MMMM', {locale: retrieveLocale()});
    result.push(formattedDate);
  }
  return result;
}

var daysOfWeek = ()=>{
  let startWeekDay = startOfWeek(new Date(), { weekStartsOn: 1 })
  let weekDaysInterval = eachDayOfInterval({start: startWeekDay, end: addDays(startWeekDay, 6)});
  let result = weekDaysInterval.map(day => format(day, 'EEEE', {locale: retrieveLocale()}));
  return result;
}


// The following function builds an array of objects with dates to be displayed in the grid
function datesForGrid(date) {
  var year = getYear(date);
  var month = getMonth(date);
  // days array holds all the days to be populated in the grid
  var dates = [];
  // Day on which the month starts
  var firstDay = new Date(year, month).getDay() - 1;
  // Total number of days in the month
  var totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  // Total number of days in the previous month
  var totalDaysInPrevMonth = new Date(year, month, 0).getDate();

  // Days from prev month to show in the grid
  for(var i = 1; i <= firstDay; i++) {
    var prevMonthDate = totalDaysInPrevMonth - firstDay + i;
    var key = new Date(year, month -1, prevMonthDate).toLocaleString();
    dates.push({key: key, date: prevMonthDate, monthClass:'prev'});
  }
  // Days of the current month to show in the grid
  for(var i = 1; i <= totalDaysInMonth; i++) {
    var key = new Date(year, month, i).toLocaleString();
    if(i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      dates.push({key: key, date: i, monthClass: 'current', todayClass: 'today'})
    } else{
      dates.push({key: key, date: i, monthClass: 'current'});
    }
  }

  // If there is space left over in the grid, then show the dates for the next month
  if(dates.length < gridSize) {
    var count = gridSize - dates.length;
    for(var i = 1; i <= count; i++) {
      var key = new Date(year, month + 1, i).toLocaleString();
      dates.push({key: key, date: i, monthClass:'next'});
    }
  }
  return dates;
}

function labelMonth(date){
  return format(date, 'MMMM yyyy', {locale: retrieveLocale()});
}





export {daysOfWeek, datesForGrid, labelMonth };
