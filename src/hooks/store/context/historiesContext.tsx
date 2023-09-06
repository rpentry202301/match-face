'use client'
import { createContext, Dispatch, useContext, useReducer } from "react";
import { SelectHistoryAction } from "@/types/admin/histories/admin_histories";
import { SelectHistoryReducer } from "../reducer/historiesReducer";

const SelectHistoryContext = createContext<{month:string,department:number[],skills:number[]}| undefined>(undefined);
const SelectHistoryDispatchContext = createContext<Dispatch<SelectHistoryAction>|undefined>(undefined)
const initialSelect = {month:"",department:[],skills:[]}

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
