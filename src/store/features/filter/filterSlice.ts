import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface FilterState {
  sort: string
  order: string
}

const initialState: FilterState = {
  sort: '',
  order: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  selectors: {
    filters: state => state,
  },
  reducers: {
    setFilter: (state, action: PayloadAction<any>) => {
      state.sort = action.payload.selectedSortBy
      state.order = action.payload.selectedSortOrder
    },
  },
})

export const { filters } = filterSlice.selectors
export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
