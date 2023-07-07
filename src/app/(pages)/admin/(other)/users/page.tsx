"use client";
import SearchUser from "@/components/pages/admin/users/SearchUser";
import UserList from "@/components/pages/admin/users/UserList";

const UsersPage = () => {
  return (
    <>
      <div>ユーザー管理画面</div>
      <SearchUser />
      <UserList />
    </>
  );
};

export default UsersPage;
