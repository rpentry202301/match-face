'use client'
import HistoriesList from '@/components/pages/admin/histories/list';
import HistoriesSelect from '@/components/pages/admin/histories/select'
import { useAnswerRequests, useDepartments, useProjects, useSkills, useAnswers, useUsers, useAnswerRequestQuestions } from '@/hooks/store/context/historiesContext';
const HistoriesPage = () => {
  // データがないときのテスト用にpropsとして受け渡しているが、実際には各ページで定義
  const skills = useSkills()
  const departments = useDepartments()
  const projects = useProjects()
  const answer_requests = useAnswerRequests()
  const answers = useAnswers()
  const users = useUsers()
  const answer_request_questions = useAnswerRequestQuestions()

  return (
    <>
      <HistoriesSelect className={''} projects={projects} answer_requests={answer_requests} departments={departments} skills={skills}/>
      <HistoriesList projects={projects} answer_requests={answer_requests} answers={answers} users={users} answer_request_questions={answer_request_questions}/>
    </>);
};

export default HistoriesPage;
