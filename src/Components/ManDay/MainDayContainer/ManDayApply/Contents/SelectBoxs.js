import React, { useEffect, useMemo, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";
import { toast } from "../../../../ToastMessage/ToastManager";
import OptionSelect from "./OptionSelect/OptionSelect";
export const SelectBoxsMainDivBox = styled.div`
  margin-bottom: 30px;
  font-size: 0.9em;
  .Input_GR {
    border: 1px solid lightgray;
    display: flex;
    height: 40px;
    line-height: 40px;
    .Title {
      width: 40%;
      text-align: center;
      border-right: 1px solid lightgray;
    }
    .Answer {
      width: 60%;
      select {
        width: 100%;
        height: 30px;
        border: none;
        outline: none;
      }
      input {
        width: 100%;
        height: 30px;
        border: none;
        outline: none;
        padding-left: 10px;
      }
    }
  }
`;
const SelectBoxs = ({ setWeekContainer, Now_Data }) => {
  const { Depart_Option_Lists, Sub_Depart_Option_Lists } = useSelector(
    (state) => state.Man_Day_Select_Option_Lists_State,
    shallowEqual,
  );

  const isReadOnly = ["BB07", "BB12", "BB08"].includes(Now_Data.divide);

  const filteredSubDepartOptions = useMemo(() => {
    return Sub_Depart_Option_Lists.filter(
      (item) => item.itemParentCode === Now_Data.depart,
    ).sort((a, b) => a.itemRank - b.itemRank);
  }, [Sub_Depart_Option_Lists, Now_Data.depart]);

  const updateCurrentChild = (newValuesObj) => {
    setWeekContainer((prev) => ({
      ...prev,
      Date_Lists: prev.Date_Lists.map((dayItem) =>
        dayItem.date === Now_Data.date
          ? {
              ...dayItem,
              child: dayItem.child.map((childItem) =>
                childItem.index === Now_Data.index
                  ? { ...childItem, ...newValuesObj }
                  : childItem,
              ),
            }
          : dayItem,
      ),
    }));
  };

  const handleFieldChange = ({ depart, sub_depart, divide }) => {
    let updates = { depart, sub_depart, divide };

    if (divide && divide !== "nothing") {
      if (divide === "BB07" || divide === "BB12") {
        updates.man_day = 8;
        toast.show({
          title: `Man-day(시간)는 8로 고정됩니다.`,
          successCheck: true,
          duration: 3000,
        });
      } else if (divide === "BB08") {
        updates.man_day = 4;
        toast.show({
          title: `Man-day(시간)는 4로 고정됩니다.`,
          successCheck: true,
          duration: 3000,
        });
      }
    }

    updateCurrentChild(updates);
  };

  const handleManDayChange = (e) => {
    const val = e.target.value;

    if (val === "") {
      updateCurrentChild({ man_day: "" });
      return;
    }

    const num = Number(val);
    if (!isNaN(num) && Number.isInteger(num) && num >= 0 && num <= 8) {
      updateCurrentChild({ man_day: num });
    }
  };

  const handleDepartSelect = (e) => {
    const selectedDepart = e.target.value;
    let selectedSubDepart = null;

    const autoMap = {
      AA99: "AA9901",
      AA08: "AA0801",
      AA09: "AA0901",
    };
    if (autoMap[selectedDepart]) {
      selectedSubDepart = autoMap[selectedDepart];
    }

    handleFieldChange({
      depart: selectedDepart,
      sub_depart: selectedSubDepart,
      divide: "nothing",
    });
  };

  return (
    <SelectBoxsMainDivBox>
      <div className="Input_GR">
        <div className="Title">설비군</div>
        <div className="Answer">
          <select value={Now_Data.depart || ""} onChange={handleDepartSelect}>
            <option value=""></option>
            {Depart_Option_Lists.map((list) => (
              <option value={list.itemCode} key={list.itemCode}>
                {list.itemName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="Input_GR">
        <div className="Title">설비명</div>
        <div className="Answer">
          <select
            value={Now_Data.sub_depart || ""}
            onChange={(e) =>
              handleFieldChange({
                depart: Now_Data.depart,
                sub_depart: e.target.value,
                divide: "nothing",
              })
            }
          >
            <option value=""></option>
            {filteredSubDepartOptions.map((list) => (
              <option value={list.itemCode} key={list.itemCode}>
                {list.itemName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="Input_GR">
        <div className="Title">업무 유형</div>
        <div className="Answer">
          <OptionSelect
            Now_Data={Now_Data}
            handleFieldChange={(depart, sub_depart, divide) =>
              handleFieldChange({ depart, sub_depart, divide })
            }
          />
        </div>
      </div>

      <div className="Input_GR">
        <div className="Title">Man-day(시간)</div>
        <div className="Answer">
          <input
            value={Now_Data.man_day}
            type="number"
            min={0}
            max={8}
            step={1}
            onChange={handleManDayChange}
            readOnly={isReadOnly}
          />
        </div>
      </div>
    </SelectBoxsMainDivBox>
  );
};

export default SelectBoxs;
