"use client";
import {
  Dispatch,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";
import { selecterReducer } from "../reducer/selecterReducer";
import { SelectReducerAction } from "@/types/admin/tasks/register/types";

const UserSelectContext = createContext<
  [string[], Dispatch<SelectReducerAction>] | undefined
>(undefined);

export const UserSelectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<string[], SelectReducerAction>>(
    selecterReducer,
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
    throw new Error("Function 'useUserSelect' must be used in Provider.");
  return context;
};
