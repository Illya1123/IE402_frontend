import { combineReducers } from "redux";
import authReducer from "./authReducer";
import nameReducer from "./nameReducer";
import isLoginReducer from "./isLoginReducer";

const rootReducer = combineReducers({
  authReducer,
  nameReducer,
  isLoginReducer,
});

export default rootReducer;
