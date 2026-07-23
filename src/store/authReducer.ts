import { authAPI, type LoginParams } from "../api/todoListsApi";
import { handleRequestError, handleResponseError } from "../utils/errorUtils";
import { setAppStatusAC } from "./appReducer";
import type { AppThunk } from "./store";
import { clearTodoListsDataAC } from "./todoListsReducer";

const AUTH_ACTION_TYPES = {
  LOGIN: "login/SET-IS-LOGGED-IN",
} as const;

type AuthState = typeof initialState;

export type AuthActions = ReturnType<typeof setIsLoggedInAC>;

const initialState = {
  isLoggedIn: false,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthActions,
): AuthState => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.LOGIN:
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};

export const setIsLoggedInAC = (value: boolean) => {
  return { type: AUTH_ACTION_TYPES.LOGIN, value };
};

export const loginTC = (data: LoginParams): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI
      .login(data)
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(clearTodoListsDataAC());
          dispatch(setIsLoggedInAC(true));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleResponseError(response.data, dispatch);
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch);
      });
  };
};

export const logoutTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    authAPI
      .logout()
      .then((response) => {
        if (response.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(false));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleResponseError(response.data, dispatch);
        }
      })
      .catch((error) => {
        handleRequestError(error, dispatch);
      });
  };
};
