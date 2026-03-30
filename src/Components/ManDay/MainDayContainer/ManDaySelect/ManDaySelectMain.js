import React, { useEffect, useState } from "react";
import Table from "./Contents/Table";
import TableFilter from "./Contents/TableFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  initState,
  Initial_Man_Day_Select_Reducer_State_Func,
} from "../../../../Models/ManDayReducers/ManDaySelectFilterReducer";
import { Man_Day_Select_Option_fetchData } from "../../../../Models/ReduxThunks/ManDaySelectOptionReducer";
import { useApi } from "../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../API/config";

const ManDaySelectMain = () => {
  const dispatch = useDispatch();
  const Filter_State = useSelector(
    (state) => state.Man_Day_Select_Filter_Reducer_State.Filters_State,
  );
  const [Table_State, setTable_State] = useState([]);

  const { request: getManDayInfo } = useApi(
    API_CONFIG.ManDayAPI.GET_MAN_DAY_INFO,
  );

  useEffect(() => {
    Getting_Man_Day_Info_Data_Lists();
    dispatch(Man_Day_Select_Option_fetchData());
    dispatch(Initial_Man_Day_Select_Reducer_State_Func());
  }, []);

  // Man-day 조회에서 필터 별 사용자 기록 조회
  const Getting_Man_Day_Info_Data_Lists = async (chooseInitial) => {
    getManDayInfo(
      {
        Filter_State:
          chooseInitial === "initial" ? initState.Filters_State : Filter_State,
      },
      {
        onSuccess: (data) => {
          setTable_State(data);
        },
      },
    );
  };

  return (
    <div style={{ paddingRight: "20px" }}>
      <TableFilter
        Getting_Man_Day_Info_Data_Lists={(data) =>
          Getting_Man_Day_Info_Data_Lists(data)
        }
      ></TableFilter>
      <Table Table_State={Table_State}></Table>
    </div>
  );
};

export default ManDaySelectMain;
