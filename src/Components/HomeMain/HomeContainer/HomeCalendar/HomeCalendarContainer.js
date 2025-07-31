import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';
import { Request_Get_Axios } from '../../../../API';
import { useSelector } from 'react-redux';

const HomeCalendarContainer = () => {
    const now = new Date();
    const Login_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [events, setEvents] = useState([]);
    const [Holiday_List, setHoliday_List] = useState([]);
    useEffect(() => {
        Getting_Holiday_Lists();
    }, [month]);

    const Getting_Holiday_Lists = async () => {
        const Getting_Holiday_Lists = await Request_Get_Axios('/API/PLM/user/Getting_Holiday_Lists', {
            Select_Date: `${year}-${month > 10 ? month + 1 : `0${month + 1}`}`,
        });
        if (Getting_Holiday_Lists.status) {
            setHoliday_List(Getting_Holiday_Lists.data);
        }
    };
    const Change_Color_State = async () => {
        const Getting_PIMS_Data = await Request_Get_Axios('/API/PLM/Getting_Month_Man_Day_Select', {
            date: `${year}-${month + 1}`,
        });
        if (Getting_PIMS_Data.status) {
            setEvents(Getting_PIMS_Data.data);
        }
    };

    useEffect(() => {
        Change_Color_State();
    }, [year, month]);

    const handleMonthChange = offset => {
        let newMonth = month + offset;
        let newYear = year;

        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }

        setYear(newYear);
        setMonth(newMonth);
    };

    return (
        <Calendar
            Holiday_List={Holiday_List}
            year={year}
            month={month}
            onMonthChange={handleMonthChange}
            events={events}
            Change_Color_State={() => Change_Color_State()}
        />
    );
};

export default HomeCalendarContainer;
