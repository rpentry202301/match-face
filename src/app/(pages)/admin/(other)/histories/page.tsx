import HistoriesList from '@/components/pages/admin/histories/list';
import HistoriesSelect from '@/components/pages/admin/histories/select'
import {skills,departments,projects,project_skills,answer_requests,answers,users} from '@/const/admin_histories'
const HistoriesPage = () => {
  return (
    <>
      <HistoriesSelect className={''} projects={projects} answer_requests={answer_requests} departments={departments} skills={skills}/>
      <HistoriesList projects={projects} answer_requests={answer_requests} answers={answers} users={users}/>
    </>);
};

export default HistoriesPage;
