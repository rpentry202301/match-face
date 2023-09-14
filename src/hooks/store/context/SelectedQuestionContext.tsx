"use client";
import {
  Dispatch,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";
import { QusetionsReducer } from "../reducer/selecterReducer";
import { QuestionsReducerAction } from "@/types/admin/tasks/register/types";

export type Questions = {
  projectId: number;
  list: {
    id: number;
    name: string;
  }[];
};

const SelectedQuestionContext = createContext<
  [Questions, Dispatch<QuestionsReducerAction>] | undefined
>(undefined);

export const SelectedQuestionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer<
    Reducer<Questions, QuestionsReducerAction>
  >(QusetionsReducer, { projectId: 0, list: [] });
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
