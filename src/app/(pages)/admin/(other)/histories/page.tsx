import Loading from '@/components/elements/loading/Loading';
import HistoriesList from '@/components/pages/admin/histories/list';
import HistoriesSelect from '@/components/pages/admin/histories/select'
import { projects, answer_requests, answers, users, answer_request_questions,skills,departments,project_skills } from '@/const/admin_histories';
import { Suspense } from 'react';

const HistoriesPage = () => {
  // fetch
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <HistoriesSelect className={''} projects={projects} answer_requests={answer_requests} departments={departments} skills={skills}/>
        <HistoriesList projects={projects} answer_requests={answer_requests} answers={answers} users={users} answer_request_questions={answer_request_questions} project_skills={project_skills}/>
      </Suspense>
    </>);
};

export default HistoriesPage;
