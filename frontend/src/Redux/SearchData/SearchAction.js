import {SHOW_SEARCH_DATA} from "../constant";

export const showSearchData=(data,i)=>{
    return {
            type:SHOW_SEARCH_DATA,
            data:data
        }
    
}