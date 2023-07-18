"use client";
import {
  Dispatch,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";
import { userSelectReducer } from "../reducer/userSelectReducer";
import { UserSelectReducerAction } from "@/types/admin/tasks/register/types";

const UserSelectContext = createContext<
  [string[], Dispatch<UserSelectReducerAction>] | undefined
>(undefined);

export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<string[], UserSelectReducerAction>>(
    userSelectReducer,
    []
  );
  return (
    <UserSelectContext.Provider value={[state, dispatch]}>
      {children}
    </UserSelectContext.Provider>
  );
};

export const useUserSelect = () => {
  const context = useContext(UserSelectContext);
  if (context === undefined)
    throw new Error("Function 'useCounter' must be used in Provider.");
  return context;
};
