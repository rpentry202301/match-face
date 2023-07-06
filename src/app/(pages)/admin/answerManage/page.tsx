import Header from "@/components/elements/header/Header";
import Refinement from "../../../../components/pages/admin/answerManage/refinement";
import OrangeButton from "@/components/ui/button/OrangeButton";
import ProjectTable from "../../../../components/pages/admin/answerManage/projectTable";

const AnswerManage = () => {
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

export default AnswerManage;
