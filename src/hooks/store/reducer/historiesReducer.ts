import { SelectHistoryAction } from "@/types/admin/histories/admin_histories"

export function SelectHistoryReducer(
    state:{month:string,department:number[],skills:number[]},
    action:SelectHistoryAction):{month:string,department:number[],skills:number[]}{
    switch(action.type){
        case "select":{
            state = action.payload
        }
        default:{
            return state
        }
    }
}
