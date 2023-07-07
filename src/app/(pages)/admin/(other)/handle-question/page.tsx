import Refinement from "@/components/pages/admin/answerManage/refinement";
import OrangeButton from "@/components/ui/button/OrangeButton";
import ProjectTable from "@/components/pages/admin/answerManage/projectTable";

const HandleQuestionPage = () => {
  return (
    <>
      <div className="flex flex-col items-center my-10">
        <Refinement />
        <OrangeButton label="新規追加" className="my-10 active:my-10" />
        <ProjectTable />
      </div>
    </>
  );
};

export default HandleQuestionPage;
