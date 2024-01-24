import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface PaginationState {
  totalPages: number
  currentPage: number
  limit: number
}

const initialState: PaginationState = {
  totalPages: 0,
  currentPage: 1,
  limit: 2,
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  selectors: {
    pagination: state => state,
  },
  reducers: {
    setTotalPage: (state, action: PayloadAction<any>) => {
      state.totalPages = action.payload
    },

    setCurrentPage: (state, action: PayloadAction<any>) => {
      state.currentPage = action.payload
    },
  },
})

export const { setTotalPage, setCurrentPage } = paginationSlice.actions
export const { pagination } = paginationSlice.selectors
export default paginationSlice.reducer
