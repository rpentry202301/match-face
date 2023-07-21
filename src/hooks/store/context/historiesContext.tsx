'use client'
import { createContext, useContext } from "react";
import { Departments, Skills } from "@/types/admin/histories/admin_histories";
import { skills,departments } from "@/const/admin_histories";

export const SkillsContext = createContext<Skills|undefined>(undefined)
export const DepartmentsContext = createContext<Departments|undefined>(undefined)

// constからのimport(valueの値)をfetchで取得したデータに変える
// const skills = fetch('')
// const departments = fetch('')

export function HistoriesProvider({children}:{children:React.ReactElement}) {
    return (
        <SkillsContext.Provider value = {skills}>
        <DepartmentsContext.Provider value = {departments}>
            {children}
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
