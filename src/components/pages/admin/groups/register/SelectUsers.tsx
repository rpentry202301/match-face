import UserSelectModal from "@/components/pages/admin/tasks/register/UserSelectModal";
// import UserInput from "./UserInput";

const SelectUsers = async() =>{
return(
    <div>
    <div className="flex">
    {/* <label htmlFor="user" className="leading-9 mr-3">▶ユーザーを選択する</label> */}
    <UserSelectModal/>
    </div>
    {/* <div>
        <UserInput/>
    </div> */}
    </div>
)
}

export default SelectUsers