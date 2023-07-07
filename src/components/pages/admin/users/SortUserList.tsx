"use client";
const SortUserList = () => {
  return (
    <div>
      <label htmlFor="sortData">ソート：</label>
      <select name="userList" id="userList" className=" border border-deep-gary">
        <option value="入社日昇順">入社日昇順</option>
        <option value="入社日降順">入社日降順</option>
      </select>
    </div>
  );
};

export default SortUserList;
