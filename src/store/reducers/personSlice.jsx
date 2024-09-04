/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
}

export const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        loadPerson:(state,actions) => {
            state.info = actions.payload
        },
        removePerson:(state, actions) => {
            state.info = null
        }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const {loadPerson,removePerson } = personSlice.actions
  
  export default personSlice.reducer