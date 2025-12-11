import React from "react";
import ScheduleRegistration from "../../../../HomeMain/HomeContainer/HomeCalendar/ScheduleRegistration/ScheduleRegistration";

const CalendarModal = (props) => {
  const { EventType } = props;
  const ModalChecking = () => {
    switch (EventType) {
      case "Home":
        return <ScheduleRegistration {...props}></ScheduleRegistration>;
      default:
        return <div></div>;
    }
  };

  return ModalChecking();
};

export default CalendarModal;
