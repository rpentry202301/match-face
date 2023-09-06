import { SelectHistoryAction } from "@/types/admin/histories/admin_histories"

export function SelectHistoryReducer(
    state:{month:string,department:null|number,skills:number[]},
    action:SelectHistoryAction):{month:string,department:null|number,skills:number[]}{
    switch(action.type){
        case "select":{
            state = action.payload
        }
        default:{
            return state
        }
    }
}
