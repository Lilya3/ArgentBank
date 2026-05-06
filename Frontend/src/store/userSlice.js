import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.token = null
      state.user = null
    },
  },
})

export const { setToken, setUser, logout } = userSlice.actions
export default userSlice.reducer