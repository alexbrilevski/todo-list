const APP_ACTION_TYPES = {
  SET_STATUS: 'app/SET_STATUS',
  SET_ERROR: 'app/SET_ERROR',
} as const;

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppState = {
  status: RequestStatus,
  error: string | null,
};

export type AppActions =
  ReturnType<typeof setAppStatusAC> |
  ReturnType<typeof setAppErrorAC>;

const initState = {
  status: 'loading' as RequestStatus,
  error: null,
};

export const appReducer = (state: AppState = initState, action: AppActions): AppState => {
  switch (action.type) {
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

export const setAppStatusAC = (status: RequestStatus) => {
  return { type: APP_ACTION_TYPES.SET_STATUS, status };
};

export const setAppErrorAC = (error: string | null) => {
  return { type: APP_ACTION_TYPES.SET_ERROR, error };
};
