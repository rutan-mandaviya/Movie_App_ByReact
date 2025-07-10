import { configureStore } from '@reduxjs/toolkit'
import movieSlice from "./reducers/movieSlice"
import tvReducer from "./reducers/tvSlice"
import personReducer from "./reducers/personSlice"


export const store = configureStore({
  reducer: {

    movie:movieSlice,
    tv:tvReducer,
    person:personReducer
  },
})