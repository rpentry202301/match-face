'use client'
import { createContext, Dispatch, useContext, useReducer, Reducer } from "react";
import { Departments, SelectHistoryAction, Skills } from "@/types/admin/histories/admin_histories";
import { skills,departments } from "@/const/admin_histories";
import { SelectHistoryReducer } from "../reducer/historiesReducer";

const SelectHistoryContext = createContext<{month:string,department:string,skills:string[]}| undefined>(undefined);
const SelectHistoryDispatchContext = createContext<Dispatch<SelectHistoryAction>|undefined>(undefined)
const initialSelect = {month:"",department:"",skills:[]}

export function SelectHistoryProvider ({children}:{children:React.ReactNode}){
    const [state,dispatch] = useReducer(SelectHistoryReducer,initialSelect)
    return (
        <SelectHistoryContext.Provider value={state}>
            <SelectHistoryDispatchContext.Provider value={dispatch} >
            {children}
            </SelectHistoryDispatchContext.Provider>
        </SelectHistoryContext.Provider>
    )
}

export const useSelectHistory = () => {
    const context = useContext(SelectHistoryContext)
    if(context === undefined) {
        throw new Error("Function 'useSelectHistory' must be used in Provider.")
    }
    return context
}

export const useSelectHistoryDispatch = () => {
    const dispatch = useContext(SelectHistoryDispatchContext)
    if(dispatch === undefined) {
        throw new Error("Function 'useSelectHistoryDispatch' must be used in Provider.")
    }
    return dispatch
}

// skill,departmentのあまり変わらないデータは一旦contextからデータ取得
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
