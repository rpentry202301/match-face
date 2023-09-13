import RegisterForm from "@/components/pages/admin/groups/register/RegisterForm";
import UserSelectModal from "@/components/pages/admin/tasks/register/UserSelectModal";

const GroupRegisterPage = () => {
  return (
    <>
    <div style={{position:'relative'}}>
      <RegisterForm />
      {/* <div style={{position:'absolute',top:0,left:0,right:200,bottom:100,display:'flex',justifyContent:'center',alignItems:'center',height:''}}> */}
        <div>
      <UserSelectModal/>
      </div>
      </div>  
    </>
  );
};

export default GroupRegisterPage;
