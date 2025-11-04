import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { mockApi } from '../../services/mockApi'

export const searchFlights = createAsyncThunk(
  'search/flights',
  async (criteria, { rejectWithValue }) => {
    try {
      const results = await mockApi.searchFlights(criteria)
      return { criteria, results }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const searchHotels = createAsyncThunk(
  'search/hotels',
  async (criteria, { rejectWithValue }) => {
    try {
      const results = await mockApi.searchHotels(criteria)
      return { criteria, results }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const searchBuses = createAsyncThunk(
  'search/buses',
  async (criteria, { rejectWithValue }) => {
    try {
      const results = await mockApi.searchBuses(criteria)
      return { criteria, results }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const searchHolidays = createAsyncThunk(
  'search/holidays',
  async (criteria, { rejectWithValue }) => {
    try {
      const results = await mockApi.searchHolidays(criteria)
      return { criteria, results }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  flights: {
    criteria: { origin: '', destination: '', date: '', passengers: 1, cabin: 'Economy' },
    results: [],
    status: 'idle',
    error: null,
  },
  hotels: {
    criteria: { destination: '', checkIn: '', checkOut: '', guests: 2, rooms: 1 },
    results: [],
    status: 'idle',
    error: null,
  },
  buses: {
    criteria: { origin: '', destination: '', date: '', passengers: 1 },
    results: [],
    status: 'idle',
    error: null,
  },
  holidays: {
    criteria: { theme: 'Romantic retreats', destination: '', startDate: '', endDate: '', travelers: 2, budget: 2500 },
    results: [],
    status: 'idle',
    error: null,
  },
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateCriteria(state, action) {
      const { domain, criteria } = action.payload
      state[domain].criteria = {
        ...state[domain].criteria,
        ...criteria,
      }
    },
    clearResults(state, action) {
      const domain = action.payload
      state[domain].results = []
      state[domain].status = 'idle'
      state[domain].error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFlights.pending, (state) => {
        state.flights.status = 'loading'
        state.flights.error = null
      })
      .addCase(searchFlights.fulfilled, (state, action) => {
        state.flights.status = 'succeeded'
        state.flights.criteria = action.payload.criteria
        state.flights.results = action.payload.results
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.flights.status = 'failed'
        state.flights.error = action.payload || action.error.message
      })
      .addCase(searchHotels.pending, (state) => {
        state.hotels.status = 'loading'
        state.hotels.error = null
      })
      .addCase(searchHotels.fulfilled, (state, action) => {
        state.hotels.status = 'succeeded'
        state.hotels.criteria = action.payload.criteria
        state.hotels.results = action.payload.results
      })
      .addCase(searchHotels.rejected, (state, action) => {
        state.hotels.status = 'failed'
        state.hotels.error = action.payload || action.error.message
      })
      .addCase(searchBuses.pending, (state) => {
        state.buses.status = 'loading'
        state.buses.error = null
      })
      .addCase(searchBuses.fulfilled, (state, action) => {
        state.buses.status = 'succeeded'
        state.buses.criteria = action.payload.criteria
        state.buses.results = action.payload.results
      })
      .addCase(searchBuses.rejected, (state, action) => {
        state.buses.status = 'failed'
        state.buses.error = action.payload || action.error.message
      })
      .addCase(searchHolidays.pending, (state) => {
        state.holidays.status = 'loading'
        state.holidays.error = null
      })
      .addCase(searchHolidays.fulfilled, (state, action) => {
        state.holidays.status = 'succeeded'
        state.holidays.criteria = action.payload.criteria
        state.holidays.results = action.payload.results
      })
      .addCase(searchHolidays.rejected, (state, action) => {
        state.holidays.status = 'failed'
        state.holidays.error = action.payload || action.error.message
      })
  },
})

export const { updateCriteria, clearResults } = searchSlice.actions
export default searchSlice.reducer
