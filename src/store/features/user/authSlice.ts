import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import {
  getTokenFromLocalStorage,
  removeTokenLocalStorage,
  setTokenToLocalStorage,
} from '../../../helpers/localstorage.helper'

interface IAuthState {
  accessToken: string | null
  role: string | null
}

const initialState: IAuthState = {
  accessToken: getTokenFromLocalStorage('accessToken')
    ? getTokenFromLocalStorage('accessToken')
    : null,
  role: getTokenFromLocalStorage('role')
    ? getTokenFromLocalStorage('role')
    : null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (
      state,
      action: PayloadAction<{
        accessToken: string
        role: string
      }>,
    ) => {
      state.accessToken = action.payload.accessToken
      setTokenToLocalStorage('accessToken', action.payload.accessToken)
      state.role = action.payload.role
      setTokenToLocalStorage('role', action.payload.role)
    },
    logout: state => {
      state.accessToken = null
      state.role = null
      removeTokenLocalStorage('accessToken')
      removeTokenLocalStorage('role')
    },
  },
})

export const { auth, logout } = authSlice.actions
export const checkAuth = (state: RootState) => state.auth

export default authSlice.reducer
