import React, { useMemo } from "react";
import { SelectBoxsMainDivBox } from "../../../../../ManDayApply/Contents/SelectBoxs";
import { InputPageMainDivBox } from "../../../../../ManDayApply/Contents/InputPage";
import moment from "moment";
import "moment/locale/ko";
import SelectInput from "../../../../../SelectInput";

const ManDaySelect = ({ Now_Select_User, NowDate }) => {
  const weekDays = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      return {
        date: moment(NowDate)
          .clone()
          .isoWeekday(index + 1)
          .format("YYYY-MM-DD"),
      };
    });
  }, [NowDate]);

  if (!Now_Select_User) return null;

  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        {Now_Select_User.departmentName} {Now_Select_User.name}{" "}
        {Now_Select_User.position}
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.9em",
        }}
      >
        {weekDays.map((list) => {
          const matchedManDays =
            Now_Select_User.man_day_infos?.filter(
              (item) => item.date === list.date,
            ) || [];

          return (
            <InputPageMainDivBox key={list.date}>
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bolder",
                  margin: "10px 0",
                }}
              >
                {moment(list.date).format("MM.DD dddd")}
              </div>

              {matchedManDays.map((item) => (
                <div key={item.index}>
                  <SelectBoxsMainDivBox>
                    <SelectInput
                      title={"설비군"}
                      answer={item.depart}
                    ></SelectInput>
                    <SelectInput
                      title={"설비명"}
                      answer={item.sub_depart}
                    ></SelectInput>
                    <SelectInput
                      title={"업무 유형"}
                      answer={item.divideCode}
                    ></SelectInput>
                    <SelectInput
                      title={"Man-day(시간)"}
                      answer={`${Number(item.manDay || 0).toFixed(0)} 시간`}
                    ></SelectInput>
                  </SelectBoxsMainDivBox>
                </div>
              ))}
            </InputPageMainDivBox>
          );
        })}
      </div>
    </div>
  );
};

export default ManDaySelect;
