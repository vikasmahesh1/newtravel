import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginAdmin as loginAdminService, logout } from '../../services/authService'

const initialState = {
  profile: null,
  status: 'idle',
  error: null,
}

export const loginAdmin = createAsyncThunk(
  'admin/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const profile = await loginAdminService(credentials)
      return profile
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const logoutAdmin = createAsyncThunk('admin/logout', async (_, { rejectWithValue }) => {
  try {
    await logout()
    return true
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.profile = action.payload
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload || action.error.message
      })
      .addCase(logoutAdmin.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.status = 'idle'
        state.profile = null
        state.error = null
      })
  },
})

export default adminSlice.reducer
