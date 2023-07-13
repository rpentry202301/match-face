import HistoriesSelect from "@/components/pages/admin/histories/select";
import HistoryList from "@/components/pages/general/histories/HistoryList";
import {skills,departments,projects,project_skills,answer_requests,answers,users} from '@/const/admin_histories'


const HistoriesPage = () => {
  return (
    <div className="flex flex-col items-center h-screen ">
      <HistoriesSelect className={"ml-[0vw]"} projects={projects} answer_requests={answer_requests}  departments={departments} skills={skills}/>
      <HistoryList />
    </div>
  );
};

export default HistoriesPage;
