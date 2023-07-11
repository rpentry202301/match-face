import Refinement from "@/components/pages/admin/answerManage/refinement";
import OrangeButton from "@/components/ui/button/OrangeButton";
import ProjectTable from "@/components/pages/admin/answerManage/projectTable";
import Link from "next/link";

const HandleQuestionPage = () => {
  return (
    <>
      <div className="flex flex-col items-center my-10">
        <Refinement />
        <Link
          href={"/admin/handle-question/create"}
          id="createButton"
          data-testid="createButton"
        >
          <OrangeButton label="新規追加" className="my-10 active:my-10" />
        </Link>
        <ProjectTable />
      </div>
    </>
  );
};

export default HandleQuestionPage;
