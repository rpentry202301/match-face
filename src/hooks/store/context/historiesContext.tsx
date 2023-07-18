'use client'
import { createContext, useContext } from "react";
import { AnswerRequests, Answers, Departments, Projects, Skills, Users,  AnswerRequestQuestions } from "@/types/admin/histories/admin_histories";
import { skills,departments,projects,answer_requests,answers,users,answer_request_questions } from "@/const/admin_histories";

export const SkillsContext = createContext<Skills|undefined>(undefined)
export const DepartmentsContext = createContext<Departments|undefined>(undefined)
export const ProjectsContext = createContext<Projects|undefined>(undefined)
export const AnswerRequestsContext = createContext<AnswerRequests|undefined>(undefined)
export const AnswersContext = createContext<Answers|undefined>(undefined)
export const UsersContext = createContext<Users|undefined>(undefined)
export const AnswerRequestQuestionsContext = createContext<AnswerRequestQuestions|undefined>(undefined)

// constからのimport(valueの値)をfetchで取得したデータに変える
export function HistoriesProvider({children}:{children:JSX.Element}) {
    return (
        <SkillsContext.Provider value = {skills}>
        <DepartmentsContext.Provider value = {departments}>
        <ProjectsContext.Provider value = {projects}>
        <AnswerRequestsContext.Provider value={answer_requests}>
        <AnswersContext.Provider value={answers}>
        <UsersContext.Provider value={users}>
        <AnswerRequestQuestionsContext.Provider value={answer_request_questions}>
            {children}
        </AnswerRequestQuestionsContext.Provider>
        </UsersContext.Provider>
        </AnswersContext.Provider>
        </AnswerRequestsContext.Provider>
        </ProjectsContext.Provider>
        </DepartmentsContext.Provider>
        </SkillsContext.Provider>
    )
}
export const useSkills = () => {
    const context = useContext(SkillsContext)
    if(context === undefined){
        throw new Error('skillsが見つかりません')
    }
    return context
}
export const useDepartments = () => {
    const context = useContext(DepartmentsContext)
    if(context === undefined){
        throw new Error('departmentsが見つかりません')
    }
    return context
}
export const useProjects = () => {
    const context = useContext(ProjectsContext)
    if(context === undefined) {
        throw new Error('projectsが見つかりません')
    }
    return context
}
export const useAnswerRequests = () => {
    const context = useContext(AnswerRequestsContext)
    if(context === undefined){
        throw new Error('answer_requestsが見つかりません')
    }
    return context
}
export const useAnswers = () => {
    const context = useContext(AnswersContext)
    if(context === undefined) {
        throw new Error('answersが見つかりません')
    }
    return context
}
export const useUsers = () => {
    const context = useContext(UsersContext)
    if(context === undefined) {
        throw new Error ('usersが見つかりません')
    }
    return context
}
export const useAnswerRequestQuestions = () => {
    const context = useContext(AnswerRequestQuestionsContext)
    if(context === undefined) {
        throw new Error('answer_request_questionsが見つかりません')
    }
    return context
}
