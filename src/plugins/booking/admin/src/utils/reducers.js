import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getMonth, getYear, addMonths, format } from 'date-fns'

const initialState = {
  currentDate: new Date(),

  status: 'idle',
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    changeMonth: (state, action) => {
      state.currentDate = addMonths(state.currentDate, action.payload);
    },
  },
})

export const { changeMonth } = calendarSlice.actions


export default calendarSlice.reducer
