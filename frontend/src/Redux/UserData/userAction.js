
import { SHOW_USER_DATA } from "Redux/constant";

export const showUserdata=(data,star)=>{
    return {
            type:SHOW_USER_DATA,
          data: data,star
        }
    
}
