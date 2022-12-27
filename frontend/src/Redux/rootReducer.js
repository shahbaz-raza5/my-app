import {combineReducers} from 'redux'

import { singleGistData } from './gistReducer'
import { UserGistData } from './UserData/userReducer'
import { singleSearchData } from './SearchData/searchReducer'



export default combineReducers({singleGistData,UserGistData,singleSearchData})