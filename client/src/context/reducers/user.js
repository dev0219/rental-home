import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  GET_USER_REQUEST,
  GET_USER_FAILED,
} from "../constants/userConstants";

export const userState = {
  users: [],
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS: {
      return { loading: false, ...action.payload };
    }
    case USER_LOGIN_FAIL: {
      return { loading: false, auth:false };
    }
    case USER_LOGOUT: {
      localStorage.removeItem("userToken");
      return { loading: false };
    }
    case GET_USER_REQUEST: {
      return {loading: true};
    }
    case GET_USER_FAILED: {
      return {loading: false}
    }
    default:
      return state;
  }
};
