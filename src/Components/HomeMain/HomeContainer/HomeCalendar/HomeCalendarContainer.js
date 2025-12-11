import React, { useCallback, useEffect, useState } from "react";
import Calendar from "./Calendar";
import { Request_Get_Axios } from "../../../../API";
import { useMonthMove } from "../MonthMove/MonthMove";

const HomeCalendarContainer = () => {
  const { year, month, Select_Month_UI } = useMonthMove();
  const [events, setEvents] = useState([]);

  const Change_Color_State = useCallback(async () => {
    const Getting_PIMS_Data = await Request_Get_Axios(
      "/Home/Getting_Month_Man_Day_Select",
      {
        date: `${year}-${month + 1}`,
      }
    );
    if (Getting_PIMS_Data.status) {
      setEvents(Getting_PIMS_Data.data);
    }
  }, [year, month]);

  useEffect(() => {
    Change_Color_State();
  }, [Change_Color_State]);

  return (
    <Calendar
      year={year}
      month={month}
      Select_Month_UI={Select_Month_UI}
      events={events}
      Change_Color_State={Change_Color_State}
      EventType={"Home"}
    />
  );
};

export default HomeCalendarContainer;
