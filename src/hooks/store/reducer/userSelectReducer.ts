import { UserSelectReducerAction } from "@/types/admin/tasks/register/types";

export const userSelectReducer = (
  state: string[],
  action: UserSelectReducerAction
): string[] => {
  switch (action.type) {
    case "select": {
      if (action.payload.length === 0) {
        console.log("payload error");
        return state;
      }
      state = action.payload
    }
    // エラー処理
    default: {
      console.log(`Unknown action type: ${action.type}`);
      return state;
    }
  }
};
