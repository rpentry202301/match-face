import HistoriesList from '@/components/pages/admin/histories/list';
import HistoriesSelect from '@/components/pages/admin/histories/select'
import {skills,departments,projects,answer_requests,answers,users,answer_request_questions} from '@/const/admin_histories'
const HistoriesPage = () => {
  return (
    <>
      <HistoriesSelect className={''} projects={projects} answer_requests={answer_requests} departments={departments} skills={skills}/>
      <HistoriesList projects={projects} answer_requests={answer_requests} answers={answers} users={users} answer_request_questions={answer_request_questions}/>
    </>);
};

export default HistoriesPage;
