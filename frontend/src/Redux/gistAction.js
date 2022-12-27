import { SHOW_SINGLE_GIST} from "./constant";

export const showSinglegist=(data,i)=>{
    return {
            type:SHOW_SINGLE_GIST,
            data:data,i
        }
    
}



