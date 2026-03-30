import React, { useCallback, useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useMonthMove } from "../MonthMove/MonthMove";
import { useApi } from "../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../API/config";

const HomeCalendarContainer = () => {
  const { year, month, Select_Month_UI } = useMonthMove();
  const { request: getHomeCalendarData } = useApi(
    API_CONFIG.HomeAPI.CALENDAR_DATA,
  );
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getHomeCalendarData(
      {
        date: `${year}-${month + 1}`,
      },
      {
        onSuccess: (data) => {
          setEvents(data || []);
        },
      },
    );
  }, [getHomeCalendarData, year, month]);

  return (
    <Calendar
      year={year}
      month={month}
      Select_Month_UI={Select_Month_UI}
      events={events}
      EventType={"Home"}
    />
  );
};

export default HomeCalendarContainer;
