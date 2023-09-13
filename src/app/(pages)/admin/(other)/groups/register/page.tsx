import RegisterForm from "@/components/pages/admin/groups/register/RegisterForm";
import SelectUsers from "@/components/pages/admin/groups/register/SelectUsers";


const GroupRegisterPage = () => {
  return (
    <>      
      <RegisterForm>
        <SelectUsers/>
      </RegisterForm>
    </>
  );
};

export default GroupRegisterPage;
