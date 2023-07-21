import { SelectReducerAction } from "@/types/admin/tasks/register/types";

export const selecterReducer = (
  state: string[],
  action: SelectReducerAction
): string[] => {
  switch (action.type) {
    case "select": {
      state = action.payload
    }
    // エラー処理
    default: {
      console.log(`Unknown action type: ${action.type}`);
      return state;
    }
  }
};
