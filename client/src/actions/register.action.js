import {
  REGISTER_FETCHING,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "../constants";

import axios from "axios";

export const setRegisterStateToFetch = () => ({
  type: REGISTER_FETCHING,
});

export const setRegisterStateToSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const setRegisterStateToFailed = (payload) => ({
  type: REGISTER_FAILED,
  payload,
});

export const register = (account, history) => {
  return async (dispatch) => {
    try {
      dispatch(setRegisterStateToFetch());
      const result = await axios.post(
        "http://localhost:8081/api/v1/register",
        account
      );
      if (result.data.result === "success") {
        dispatch(setRegisterStateToSuccess({ result: result.data }));
        history.push("/");
      } else {
        dispatch(setRegisterStateToFailed({ result: "Register Error (Username Already Exist)" }));
      }
    } catch (e) {
      dispatch(setRegisterStateToFailed({ result: JSON.stringify(e) }));
    }
  };
};
