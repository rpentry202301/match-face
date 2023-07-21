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

const SelectedQuestionContext = createContext<
  [string[], Dispatch<SelectReducerAction>] | undefined
>(undefined);

export const SelectedQuestionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<string[], SelectReducerAction>>(
    selecterReducer,
    []
  );
  return (
    <SelectedQuestionContext.Provider value={[state, dispatch]}>
      {children}
    </SelectedQuestionContext.Provider>
  );
};

export const useSelectedQuestion = () => {
  const context = useContext(SelectedQuestionContext);
  if (context === undefined)
    throw new Error("Function 'useSelectedQuestion' must be used in Provider.");
  return context;
};
