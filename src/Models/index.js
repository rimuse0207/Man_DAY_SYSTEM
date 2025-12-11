import { combineReducers } from "redux";
import Login_Info_Reducer_State from "./LoginInfoReducer/LoginInfoReduce";
import Now_Path_Reducer_State from "./NowPathReducer/NowPathReduce";
import Man_Day_Select_Items_State from "./ReduxThunks/ManDaySelectItemReducer";
import Man_Day_Select_Filter_Reducer_State from "./ManDayReducers/ManDaySelectFilterReducer";
import Change_User_Search_Reducer_State from "./UserSearchReducer/UserSearchReducer";
import Man_Day_Select_Option_Lists_State from "./ReduxThunks/ManDaySelectOptionReducer";
import HolidayThunkReducer from "./ReduxThunks/HolidayReducer/HolidayReduce";
const rootReducer = combineReducers({
  Login_Info_Reducer_State,
  Now_Path_Reducer_State,
  Man_Day_Select_Items_State,
  Man_Day_Select_Filter_Reducer_State,
  Change_User_Search_Reducer_State,
  Man_Day_Select_Option_Lists_State,
  HolidayThunkReducer,
});

export default rootReducer;
