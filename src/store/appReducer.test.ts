import { appReducer, setAppStatusAC, type AppState, type RequestStatus } from "./appReducer";

let startState: AppState;

beforeEach(() => {
  startState = {
    status: "idle",
  };
});

test("App status is set to state correctly", () => {
  const newStatus: RequestStatus = "loading";
  const endState = appReducer(startState, setAppStatusAC(newStatus));

  expect(startState.status).toBe("idle");
  expect(endState.status).toBe(newStatus);
});
