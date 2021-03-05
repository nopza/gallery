//Login Page
export const LOGIN_FETCHING = "LOGIN_FETCHING";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

// Register Page
export const REGISTER_FETCHING = "REGISTER_FETCHING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

//MyPage
export const MYLOGIN_FETCHING = "MYLOGIN_FETCHING";
export const MYLOGIN_SUCCESS = "MYLOGIN_SUCCESS";
export const MYLOGIN_FAILED = "MYLOGIN_FAILED";

//Gallery Create Page
export const GALLERY_FETCHING = "GALLERY_FETCHING";
export const GALLERY_SUCCESS = "GALLERY_SUCCESS";
export const GALLERY_FAILED = "GALLERY_FAILED";
export const GALLERY_CLEAR = "GALLERY_CLEAR";

//GALLERY GETLIST
export const GALLERY_GETLIST_FETCHING = "GALLERY_GETLIST_FETCHING";
export const GALLERY_GETLIST_SUCCESS = "GALLERY_GETLIST_SUCCESS";
export const GALLERY_GETLIST_FAILED = "GALLERY_GETLIST_FAILED";

//GALLERY DELETELIST
export const GALLERY_DELETE_FETCHING = "GALLERY_DELETE_FETCHING";
export const GALLERY_DELETE_SUCCESS = "GALLERY_DELETE_SUCCESS";
export const GALLERY_DELETE_FAILED = "GALLERY_DELETE_FAILED";

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";

export const apiUrl = "http://localhost:8081/api/v1";
export const imageUrl = "http://localhost:8081";

export const server = {
  LOGIN_URL: `login`,
  REFRESH_TOKEN_URL: `refresh/token`,
  REGISTER_URL: `register`,
  TOKEN_KEY: `token`,
  REFRESH_TOKEN_KEY: `refresh_token`,
  GALLERY_URL: `gallery`,
  ALL_GALLERY_URL: `gallery/all`,
  TYPE_GALLERY_URL: `gallery/type`,
};
