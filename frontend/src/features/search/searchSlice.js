import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiClient } from '../../services/apiClient'
import { DEFAULT_CURRENCY, SAMPLE_GENERATED_AT, SEARCH_SCHEMAS } from '../../data/constants.js'

const normaliseSearchResponse = (criteria, response, domain) => {
  if (response && typeof response === 'object' && !Array.isArray(response)) {
    return {
      criteria: response.criteria ?? criteria,
      results: response.items ?? [],
      meta: response.meta ?? null,
      schema: response.schema ?? SEARCH_SCHEMAS[domain],
    }
  }

  const items = Array.isArray(response) ? response : []
  return {
    criteria,
    results: items,
    meta: {
      total: items.length,
      currency: DEFAULT_CURRENCY,
      generatedAt: SAMPLE_GENERATED_AT,
      source: 'api',
    },
    schema: SEARCH_SCHEMAS[domain],
  }
}

export const searchFlights = createAsyncThunk(
  'search/flights',
  async (criteria, { rejectWithValue }) => {
    try {
      const response = await apiClient.searchFlights(criteria)
      return normaliseSearchResponse(criteria, response, 'flights')
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const searchHotels = createAsyncThunk(
  'search/hotels',
  async (criteria, { rejectWithValue }) => {
    try {
      const response = await apiClient.searchHotels(criteria)
      return normaliseSearchResponse(criteria, response, 'hotels')
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const searchBuses = createAsyncThunk(
  'search/buses',
  async (criteria, { rejectWithValue }) => {
    try {
      const response = await apiClient.searchBuses(criteria)
      return normaliseSearchResponse(criteria, response, 'buses')
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const searchHolidays = createAsyncThunk(
  'search/holidays',
  async (criteria, { rejectWithValue }) => {
    try {
      const response = await apiClient.searchHolidays(criteria)
      return normaliseSearchResponse(criteria, response, 'holidays')
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  flights: {
    criteria: { origin: '', destination: '', date: '', passengers: 1, cabin: 'Economy', market: 'Domestic' },
    results: [],
    meta: null,
    schema: SEARCH_SCHEMAS.flights,
    status: 'idle',
    error: null,
  },
  hotels: {
    criteria: { destination: '', checkIn: '', checkOut: '', guests: 2, rooms: 1, market: 'Domestic' },
    results: [],
    meta: null,
    schema: SEARCH_SCHEMAS.hotels,
    status: 'idle',
    error: null,
  },
  buses: {
    criteria: { origin: '', destination: '', date: '', passengers: 1, market: 'Domestic' },
    results: [],
    meta: null,
    schema: SEARCH_SCHEMAS.buses,
    status: 'idle',
    error: null,
  },
  holidays: {
    criteria: {
      theme: 'Romantic retreats',
      destination: '',
      startDate: '',
      endDate: '',
      travelers: 2,
      budget: 120000,
      market: 'Domestic',
    },
    results: [],
    meta: null,
    schema: SEARCH_SCHEMAS.holidays,
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
      state[domain].meta = null
      state[domain].schema = SEARCH_SCHEMAS[domain]
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
        state.flights.meta = action.payload.meta
        state.flights.schema = action.payload.schema
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
        state.hotels.meta = action.payload.meta
        state.hotels.schema = action.payload.schema
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
        state.buses.meta = action.payload.meta
        state.buses.schema = action.payload.schema
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
        state.holidays.meta = action.payload.meta
        state.holidays.schema = action.payload.schema
      })
      .addCase(searchHolidays.rejected, (state, action) => {
        state.holidays.status = 'failed'
        state.holidays.error = action.payload || action.error.message
      })
  },
})

export const { updateCriteria, clearResults } = searchSlice.actions
export default searchSlice.reducer
