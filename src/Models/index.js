import { combineReducers } from 'redux';
import Login_Info_Reducer_State from './LoginInfoReducer/LoginInfoReduce';
import Now_Path_Reducer_State from './NowPathReducer/NowPathReduce';
import Man_Day_Select_Items_State from './ReduxThunks/ManDaySelectItemReducer';
import Man_Day_Select_Filter_Reducer_State from './ManDayReducers/ManDaySelectFilterReducer';

const rootReducer = combineReducers({
    Login_Info_Reducer_State,
    Now_Path_Reducer_State,
    Man_Day_Select_Items_State,
    Man_Day_Select_Filter_Reducer_State,
});

export default rootReducer;
