import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import {themeReducer} from './theme.reducer';
// rootReducer
export const rootReducer = combineReducers({
  userReducer, themeReducer
});
