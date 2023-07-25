import { SelectHistoryAction } from "@/types/admin/histories/admin_histories"

export function SelectHistoryReducer(
    state:{month:string,department:string,skills:string[]},
    action:SelectHistoryAction):{month:string,department:string,skills:string[]}{
    switch(action.type){
        case "select":{
            state = action.payload
        }
        default:{
            return state
        }
    }
}
