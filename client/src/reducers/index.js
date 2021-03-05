import { combineReducers } from "redux";
import registerReducer from "./register.reducer";
import loginReducer from "./login.reducer";
import galleryReducer from "./gallery.reducer";

export default combineReducers({
  registerReducer,
  loginReducer,
  galleryReducer,
});
