import type { Dispatch } from 'redux';
import type { ResponseData } from '../api/todoListsApi';
import { setAppErrorAC, setAppStatusAC, type AppActions } from '../store/appReducer';

type ErrorUtilsDispatchType = Dispatch<AppActions>;

export const handleResponseError = <T>(data: ResponseData<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]));
  } else {
    dispatch(setAppErrorAC('An unknown error occurred'));
  }
  dispatch(setAppStatusAC('failed'));
};

export const handleRequestError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
  dispatch(setAppErrorAC(error.message ? error.message : 'An unknown error occurred'));
  dispatch(setAppStatusAC('failed'));
};
