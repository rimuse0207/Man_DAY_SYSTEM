import React from "react";
import SelectBoxs from "./SelectBoxs";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";
import moment from "moment";
import "moment/locale/ko";
import { MdDeleteForever } from "react-icons/md";
import HolidaySelect from "./HolidaySelect";

moment.locale("ko");

export const InputPageMainDivBox = styled.div`
  width: 18%;
  .Plus_Container {
    border: 1px solid #efefef;
    text-align: center;
    font-size: 2em;
    margin-top: 20px;
    background-color: #efefef;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      opacity: 0.5;
    }
  }
  .Delete_Container {
    display: flex;
    justify-content: space-between;
    .Delete_Button {
      color: red;
      font-size: 1.2em;
      &:hover {
        cursor: pointer;
        opacity: 0.5;
      }
    }
  }
`;

const InputPage = ({ List_Items, setWeekContainer, isEditableWeek }) => {
  const isHoliday = List_Items.holidayChecking;
  const totalManDay =
    List_Items?.child?.reduce((sum, item) => sum + Number(item.man_day), 0) ||
    0;

  const handleAddChild = () => {
    const calcMan = 8 - totalManDay;
    const insertData = {
      index: moment().format("YYYYMMDDHHmmssSSS"),
      date: List_Items.date,
      depart: null,
      sub_depart: null,
      divide: null,
      man_day: calcMan > 0 && calcMan <= 8 ? calcMan : calcMan < 0 ? 1 : 0,
    };

    setWeekContainer((prev) => ({
      ...prev,
      Date_Lists: prev.Date_Lists.map((dayItem) =>
        dayItem.date === List_Items.date
          ? { ...dayItem, child: [...dayItem.child, insertData] }
          : dayItem,
      ),
    }));
  };

  const handleDeleteTable = (selectData) => {
    setWeekContainer((prev) => ({
      ...prev,
      Date_Lists: prev.Date_Lists.map((dayItem) =>
        dayItem.date === selectData.date
          ? {
              ...dayItem,
              child: dayItem.child.filter(
                (childItem) => childItem.index !== selectData.index,
              ),
            }
          : dayItem,
      ),
    }));
  };

  return (
    <InputPageMainDivBox>
      <div
        style={{
          textAlign: "center",
          fontWeight: "bolder",
          margin: "10px 0",
          color: isHoliday ? "red" : "black",
        }}
      >
        {moment(List_Items.date).format("MM.DD dddd")}
        {isHoliday && " (공휴일)"}
      </div>

      <div>
        {List_Items.child.map((list, j) => (
          <div key={list.index}>
            <div className="Delete_Container">
              <div>{j + 1}.</div>
              {!isHoliday && (
                <div
                  className="Delete_Button"
                  onClick={() => handleDeleteTable(list)}
                >
                  <MdDeleteForever />
                </div>
              )}
            </div>
            {isHoliday ? (
              <HolidaySelect Now_Data={list} />
            ) : (
              <SelectBoxs setWeekContainer={setWeekContainer} Now_Data={list} />
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          borderTop: "1px solid lightgray",
          marginTop: "10px",
          paddingTop: "10px",
        }}
      >
        <div style={{ textAlign: "end" }}>
          <h5>Man-day(시간) 합</h5>

          <div
            style={{
              color: totalManDay === 8 ? "black" : "red",
              fontWeight: totalManDay !== 8 ? "bolder" : "normal",
            }}
          >
            {totalManDay.toFixed(0)} 시간
          </div>
        </div>
      </div>

      {isEditableWeek && !isHoliday && (
        <div style={{ marginBottom: "40px" }}>
          <div className="Plus_Container" onClick={handleAddChild}>
            <FaPlus />
          </div>
        </div>
      )}
    </InputPageMainDivBox>
  );
};

export default InputPage;
