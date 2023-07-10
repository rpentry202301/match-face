import { UserList, UserListReducerAction } from "@/types/UserListReducerAction";

// Todo: 正式なdataの型を適用
export const userListInitialState: UserList[] = [];

export const userListReducer = (
  state: UserList[],
  action: UserListReducerAction
): UserList[] | UserList | void => {
  switch (action.type) {
    /** case "set"
     * @param {UserList[]} action.payload
     * @return {void}
     */
    case "set": {
      if (!action.payload) {
        console.error(
          "userListReducer error: 'add'アクションにはpayloadが必須です"
        );
        break;
      } else if (!Array.isArray(action.payload)) {
        console.error(
          "userListReducer error: 'add'アクションのpayloadは配列で指定してください"
        );
        break;
      }
      state.concat(action.payload);
      break;
    }
    /** case "search"
     * @param {UserList} action.payload
     * @return {UserList}
     */
    case "search": {

    }
    /** case "initialize"
     * @param {undefined}
     * @return {void}
     */
    case "initialize": {
      state.splice(0, state.length);
      break;
    }
  }
};
