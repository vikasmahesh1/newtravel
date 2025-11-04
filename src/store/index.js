import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../features/search/searchSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
  },
})

export const selectSearchDomain = (state, domain) => state.search[domain]
export const selectUserProfile = (state) => state.user.profile
