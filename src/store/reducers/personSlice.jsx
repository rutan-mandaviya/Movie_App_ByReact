import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  persondata:null
}

export const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    loadperson:(state,action)=>{
         state.persondata=action.payload
    },
    removeperson:(state,action)=>{
        state.persondata=null
    }
  },
})

// Action creators are generated for each case reducer function
export const {loadperson,removeperson } = personSlice.actions

export default personSlice.reducer