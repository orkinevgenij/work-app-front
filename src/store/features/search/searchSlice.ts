import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SearchState {
  search: string
}
const initialState: SearchState = {
  search: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  selectors: {
    searchValue: state => state.search,
  },
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

export const { setSearch } = searchSlice.actions
export const { searchValue } = searchSlice.selectors

export default searchSlice.reducer
