import type { RequestStatus } from "../models/app";
import { appReducer, setAppErrorAC, setAppStatusAC, type AppState } from "./appReducer";

let startState: AppState;

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
  };
});

test("App status is set to state correctly", () => {
  const newStatus: RequestStatus = "loading";
  const endState = appReducer(startState, setAppStatusAC(newStatus));

  expect(startState.status).toBe("idle");
  expect(endState.status).toBe(newStatus);
});

test("Correct error message should be set to state", () => {
  const error: string | null = "Some error";
  const endState = appReducer(startState, setAppErrorAC(error));

  expect(startState.error).toBe(null);
  expect(endState.error).toBe(error);
});
