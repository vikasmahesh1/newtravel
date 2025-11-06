import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../features/search/searchSlice'
import userReducer from '../features/user/userSlice'
import adminReducer from '../features/admin/adminSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
    admin: adminReducer,
  },
})

export const selectSearchDomain = (state, domain) => state.search[domain]
export const selectUserProfile = (state) => state.user.profile
export const selectAdminProfile = (state) => state.admin.profile
export const selectAdminStatus = (state) => state.admin.status
export const selectAdminError = (state) => state.admin.error
