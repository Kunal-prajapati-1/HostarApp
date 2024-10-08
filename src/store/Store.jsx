import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice"
import TvReducer from "./reducers/tvSlice"
import personReducer from "./reducers/personSlice"
export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: TvReducer,
    person: personReducer
  },
});
