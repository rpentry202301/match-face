"use client";
import {
  Dispatch,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";
import { UsersReducer } from "../reducer/selecterReducer";
import { UsersReducerAction } from "@/types/admin/tasks/register/types";

export type Users = {
  id: string;
  name: string;
};

const UserSelectContext = createContext<
  [Users[], Dispatch<UsersReducerAction>] | undefined
>(undefined);

export const UserSelectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<Users[], UsersReducerAction>>(
    // selecterReducer,
    UsersReducer,
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
