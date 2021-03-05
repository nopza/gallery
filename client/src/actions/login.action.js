import {
  LOGIN_FETCHING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  server,
} from "../constants";
import { httpClient } from "../utils/HttpClient";
import jwt from "jsonwebtoken";

export const setLoginStateToFetch = () => ({
  type: LOGIN_FETCHING,
});

export const setLoginStateToSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const setLoginStatetoFailed = (payload) => ({
  type: LOGIN_FAILED,
  payload,
});

export const setLoginStatetoLogout = () => ({
  type: LOGOUT,
});

export const login = (value, history) => {
  return async (dispatch) => {
    dispatch(setLoginStateToFetch());

    const result = await httpClient.post(server.LOGIN_URL, value);
    if (result.data.result == "success") {
      // backup token
      const { token, refreshToken } = result.data;
      localStorage.setItem(server.TOKEN_KEY, token);
      localStorage.setItem(server.REFRESH_TOKEN_KEY, refreshToken);

      dispatch(setLoginStateToSuccess("Login successfully"));
      window.location.assign("/login");
    } else {
      dispatch(setLoginStatetoFailed("Login failed"));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem(server.TOKEN_KEY);
    localStorage.removeItem(server.REFRESH_TOKEN_KEY);
    dispatch(setLoginStatetoLogout());
    window.location.assign("/login");
  };
};

export const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);
  //Check is token exists
  if (token) {
    //Decode token
    var decodedToken = jwt.decode(token, { complete: true });
    //Get current datetime
    var dateNow = new Date();
    //Check is token expired
    if (decodedToken.exp < dateNow.getTime()) {
      //expired User is not logged in
      return false;
    } else {
      //not expire User is logged in
      return true;
    }
    // return !(decodedToken.exp < dateNow.getTime());
  } else {
    //token not exists
    return false;
  }
};
