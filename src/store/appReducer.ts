const APP_ACTION_TYPES = {
  SET_STATUS: 'app/SET_STATUS',
} as const;

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppState = {
  status: RequestStatus,
};

export type AppActions = ReturnType<typeof setAppStatusAC>;

const initState = {
  status: 'loading' as RequestStatus,
};

export const appReducer = (state: AppState = initState, action: AppActions): AppState => {
  switch (action.type) {
    case APP_ACTION_TYPES.SET_STATUS: {
      return { ...state, status: action.status };
    }
    default: {
      return state;
    }
  }
};

export const setAppStatusAC = (status: RequestStatus) => {
  return { type: APP_ACTION_TYPES.SET_STATUS, status };
};
