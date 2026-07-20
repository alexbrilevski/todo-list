import { authAPI } from "../api/todoListsApi";
import type { RequestStatus } from "../models/app";
import { handleRequestError, handleResponseError } from "../utils/errorUtils";
import { setIsLoggedInAC } from "./authReducer";
import type { AppThunk } from "./store";

const APP_ACTION_TYPES = {
  SET_INIT_STATUS: 'app/SET_INIT_STATUS',
  SET_STATUS: 'app/SET_STATUS',
  SET_ERROR: 'app/SET_ERROR',
} as const;

export type AppState = {
  isInitialized: boolean,
  status: RequestStatus,
  error: string | null,
};

export type AppActions =
  | ReturnType<typeof setInitializedAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>;

const initState = {
  isInitialized: false,
  status: 'idle' as RequestStatus,
  error: null,
};

export const appReducer = (state: AppState = initState, action: AppActions): AppState => {
  switch (action.type) {
    case APP_ACTION_TYPES.SET_INIT_STATUS: {
      return { ...state, isInitialized: action.isInitialized };
    }
    case APP_ACTION_TYPES.SET_STATUS: {
      return { ...state, status: action.status };
    }
    case APP_ACTION_TYPES.SET_ERROR: {
      return { ...state, error: action.error };
    }
    default: {
      return state;
    }
  }
};

export const setInitializedAC = (isInitialized: boolean) => {
  return { type: APP_ACTION_TYPES.SET_INIT_STATUS, isInitialized };
};

export const setAppStatusAC = (status: RequestStatus) => {
  return { type: APP_ACTION_TYPES.SET_STATUS, status };
};

export const setAppErrorAC = (error: string | null) => {
  return { type: APP_ACTION_TYPES.SET_ERROR, error };
};

export const initializeAppTC = (): AppThunk => {
  return (dispatch) => {
    authAPI.me()
      .then(response => {
        if (response.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true));
        } else {
          handleResponseError(response.data, dispatch);
        }
        dispatch(setInitializedAC(true));
      })
      .catch(error => {
        handleRequestError(error, dispatch);
      });
  };
};
