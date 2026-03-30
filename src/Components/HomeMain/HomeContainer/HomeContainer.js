import React, { useEffect } from "react";
import styled from "styled-components";
import HomeClock from "./HomeClock/HomeClock";
import Info from "./HomeInfo/Info";
import HomeCalendarContainer from "./HomeCalendar/HomeCalendarContainer";
import { useDispatch } from "react-redux";
import { Holiday_Date_Lists_Fethcing } from "../../../Models/ReduxThunks/HolidayReducer/HolidayReduce";
import { HomeContainerMainPageMainDivBox } from "../../Common/Styled/Home/HomeStyled";

const HomeContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Holiday_Date_Lists_Fethcing());
  }, []);
  return (
    <HomeContainerMainPageMainDivBox>
      <div className="BodyContentFloat">
        <div className="BodyContentLeft">
          <Info></Info>
          <HomeClock></HomeClock>
        </div>
        <div className="BodyContentRight">
          <div>
            <HomeCalendarContainer></HomeCalendarContainer>
          </div>
        </div>
      </div>
    </HomeContainerMainPageMainDivBox>
  );
};

export default HomeContainer;
