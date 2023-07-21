"use client";
import {
  Dispatch,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";
import { selectedQuestionReducer } from "../reducer/selectedQuestionReducer";
import { SelectReducerAction } from "@/types/admin/tasks/register/types";

const SelectedQuestionContext = createContext<
  [string[], Dispatch<SelectReducerAction>] | undefined
>(undefined);

export const SelectedQuestionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<string[], SelectReducerAction>>(
    selectedQuestionReducer,
    []
  );
  return (
    <SelectedQuestionContext.Provider value={[state, dispatch]}>
      {children}
    </SelectedQuestionContext.Provider>
  );
};

export const useSelectQuestion = () => {
  const context = useContext(SelectedQuestionContext);
  if (context === undefined)
    throw new Error("Function 'useUserSelect' must be used in Provider.");
  return context;
};
