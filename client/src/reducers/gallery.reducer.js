import {
  GALLERY_SUCCESS,
  GALLERY_FETCHING,
  GALLERY_FAILED,
  GALLERY_CLEAR,
  GALLERY_GETLIST_SUCCESS,
  GALLERY_GETLIST_FETCHING,
  GALLERY_GETLIST_FAILED,
  GALLERY_DELETE_SUCCESS,
  GALLERY_DELETE_FETCHING,
  GALLERY_DELETE_FAILED,
} from "../constants";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
  // typeSearch: "",
  // nameSearch: "",
  resultlist: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GALLERY_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case GALLERY_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    case GALLERY_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case GALLERY_CLEAR:
      return { ...state, result: null, isFetching: false, isError: false };
    case GALLERY_GETLIST_SUCCESS:
      return {
        ...state,
        result: null,
        resultlist: payload,
        isFetching: false,
        isError: false,
      };
    case GALLERY_GETLIST_FETCHING:
      return {
        ...state,
        result: null,
        resultlist: [],
        isFetching: true,
        isError: false,
      };
    case GALLERY_GETLIST_FAILED:
      return {
        ...state,
        result: null,
        resultlist: null,
        isFetching: false,
        isError: true,
      };
    case GALLERY_DELETE_FETCHING:
      return { ...state, isFetching: true, isError: false };
    case GALLERY_DELETE_SUCCESS:
      return { ...state, isFetching: false, isError: false };
    case GALLERY_DELETE_FAILED:
      return { ...state, isFetching: false, isError: true };

    default:
      return state;
  }
};
