import moment from "moment";
import React from "react";
import { InputPageMainDivBox } from "./InputPage";
import { SelectBoxsMainDivBox } from "./SelectBoxs";
import { useSelector, shallowEqual } from "react-redux";
import SelectInput from "../../SelectInput";

const ReadingBoxs = ({ List_Items }) => {
  const {
    Depart_Option_Lists,
    Sub_Depart_Option_Lists,
    Divide_Depart_Option_Lists,
  } = useSelector(
    (state) => state.Man_Day_Select_Option_Lists_State,
    shallowEqual,
  );

  return (
    <InputPageMainDivBox>
      <div
        style={
          List_Items.holidayChecking
            ? {
                textAlign: "center",
                fontWeight: "bolder",
                marginTop: "10px",
                marginBottom: "10px",
                color: "red",
              }
            : {
                textAlign: "center",
                fontWeight: "bolder",
                marginTop: "10px",
                marginBottom: "10px",
              }
        }
      >
        {moment(List_Items.date).format("MM.DD dddd")}
        {List_Items.holidayChecking ? "(공휴일)" : ""}
      </div>

      <div>
        {List_Items.child.map((list, j) => {
          const departName =
            Depart_Option_Lists.find((item) => item.itemCode === list.depart)
              ?.itemName || "-";

          const subDepartName =
            Sub_Depart_Option_Lists.find(
              (item) =>
                item.itemCode === list.sub_depart &&
                item.itemParentCode === list.depart,
            )?.itemName || "-";

          const divideName =
            Divide_Depart_Option_Lists.find(
              (item) =>
                item.itemCode === list.divide &&
                item.divideType === "divide" &&
                item.itemParentCode === list.sub_depart,
            )?.itemName || "-";

          const manDayHours = Number(list.man_day || 0).toFixed(0);

          return (
            <SelectBoxsMainDivBox key={list.index}>
              <SelectInput title="설비군" answer={departName}></SelectInput>
              <SelectInput title="설비명" answer={subDepartName}></SelectInput>
              <SelectInput title="업무 유형" answer={divideName}></SelectInput>
              <SelectInput
                title="Man-day(시간)"
                answer={`${manDayHours} 시간`}
              ></SelectInput>
            </SelectBoxsMainDivBox>
          );
        })}
      </div>
    </InputPageMainDivBox>
  );
};

export default ReadingBoxs;
