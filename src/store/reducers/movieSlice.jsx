import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  moviedata:null
}

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    loadmovie:(state,action)=>{
         state.moviedata=action.payload
    },
    removemovie:(state,action)=>{
        state.moviedata=null
    }
  },
})

// Action creators are generated for each case reducer function
export const {loadmovie,removemovie } = movieSlice.actions

export default movieSlice.reducer