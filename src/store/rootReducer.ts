import { combineReducers } from "@reduxjs/toolkit";
import customSelectReducer from "./SelectSlice";

const rootReducer = combineReducers({
	customSelect: customSelectReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
