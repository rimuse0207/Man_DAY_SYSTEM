import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { SelectBoxsMainDivBox } from "./SelectBoxs";

const HolidaySelect = ({ Now_Data }) => {
  const {
    Depart_Option_Lists,
    Sub_Depart_Option_Lists,
    Divide_Depart_Option_Lists,
  } = useSelector(
    (state) => state.Man_Day_Select_Option_Lists_State,
    shallowEqual,
  );

  const departName =
    Depart_Option_Lists.find((list) => list.itemCode === Now_Data.depart)
      ?.itemName || "-";

  const subDepartName =
    Sub_Depart_Option_Lists.find(
      (list) =>
        list.itemCode === Now_Data.sub_depart &&
        list.itemParentCode === Now_Data.depart,
    )?.itemName || "-";

  const divideName =
    Divide_Depart_Option_Lists.find(
      (list) =>
        list.itemCode === Now_Data.divide &&
        list.itemParentCode === Now_Data.sub_depart,
    )?.itemName || "-";

  const manDayHours = Number(Now_Data.man_day || 0).toFixed(0);

  return (
    <SelectBoxsMainDivBox>
      <div className="Input_GR">
        <div className="Title">설비군</div>
        <div className="Answer" style={{ textAlign: "center" }}>
          {departName}
        </div>
      </div>

      <div className="Input_GR">
        <div className="Title">설비명</div>
        <div className="Answer" style={{ textAlign: "center" }}>
          {subDepartName}
        </div>
      </div>

      <div className="Input_GR">
        <div className="Title">업무 유형</div>
        <div className="Answer" style={{ textAlign: "center" }}>
          {divideName}
        </div>
      </div>

      <div className="Input_GR">
        <div className="Title">Man-day(시간)</div>
        <div className="Answer" style={{ textAlign: "center" }}>
          {manDayHours} 시간
        </div>
      </div>
    </SelectBoxsMainDivBox>
  );
};

export default HolidaySelect;
