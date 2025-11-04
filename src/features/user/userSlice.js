import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login, logout, signUp } from '../../services/authService'

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const signupUser = createAsyncThunk(
  'user/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await signUp(payload)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    await logout()
    return true
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const initialState = {
  profile: null,
  status: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.profile = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload || action.error.message
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.profile = action.payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload || action.error.message
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle'
        state.profile = null
      })
  },
})

export default userSlice.reducer
