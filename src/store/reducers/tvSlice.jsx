import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tvdata:null
}

export const tvSlice = createSlice({
  name: 'tvs',
  initialState,
  reducers: {
    loadtv:(state,action)=>{
         state.tvdata=action.payload
    },
    removetv:(state,action)=>{
        state.tvdata=null
    }
  },
})

// Action creators are generated for each case reducer function
export const {loadtv,removetv} = tvSlice.actions

export default tvSlice.reducer