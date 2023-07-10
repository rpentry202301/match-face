// Note: 後で要削除
export type UserList = {
  id: number;
  user_name: string;
  user_status: "研修中" | "待機中" | "アサイン中";
  entry_date: string;
  department: string;
};

// Todo: 後々payloadに正式なdataの型を適用
export type UserListReducerAction = {
  type: "set" | "initialize" | "search";
  payload?: UserList | UserList[];
};

/** type "search"用の型ガード関数
 * @param {UserList | UserList[] | undefined} actionPayload
 * @return {boolean}
 */
function isUserList(
  actionPayload: UserList | UserList[] | undefined
): actionPayload is UserList {
  return !Array.isArray(actionPayload) && actionPayload;
}
