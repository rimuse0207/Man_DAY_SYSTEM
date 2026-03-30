import React, { use, useCallback, useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import Select from "react-select";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  Initial_Man_Day_Select_Reducer_State_Func,
  Insert_Man_Day_Select_Reducer_State_Func,
} from "../../../../../Models/ManDayReducers/ManDaySelectFilterReducer";
import { customStyles } from "../../TeamManDaySelect/Content/SelectAll/Top/SelectAllFilter";
import { toast } from "../../../../ToastMessage/ToastManager";
import { generateOptions } from "../../../../Common/Utils/ManDay/sortingOptions";

export const TableFilterMainDivBox = styled.div`
  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .Filter_Container {
    display: flex;
    flex-flow: wrap;
    justify-content: start;
    /* margin-bottom: 20px; */
    .Filter_GR {
      width: 300px;
      display: flex;
      align-items: center;
      border-left: 1px solid lightgray;
      margin-right: 10px;
      .Search_Icon_Container {
        border: 1px solid lightgray;
        height: 90%;
        padding: 10px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        line-height: 0px;
        border-left: none;
        &:hover {
          cursor: pointer;
          opacity: 0.5;
        }
      }
    }
    .Filter_Title {
      width: 100px;
      text-align: center;
      font-weight: bolder;
      font-size: 1em;
      padding-bottom: 10px;
      padding-top: 10px;
    }
    .Filter_Content {
      width: 250px;
      input {
        border: 1px solid lightgray;
        height: 35px;
        width: 100%;
        padding-left: 10px;
        border-radius: 5px;
      }
    }
  }

  .Filter_Button_Group {
    margin-top: 20px;
    .Filter_Button_Container {
      display: flex;
      justify-content: end;
      button {
        margin-bottom: 20px;
        padding: 10px;
        font-size: 0.9em;
        border: none;
        margin-left: 20px;
        width: 80px;
        border-radius: 5px;
        background-color: orange;
        color: #fff;
        &:hover {
          cursor: pointer;
          opacity: 0.7;
        }
      }
    }
  }
`;

const TableFilter = ({ Getting_Man_Day_Info_Data_Lists }) => {
  const dispatch = useDispatch();

  const Filter_State = useSelector(
    (state) => state.Man_Day_Select_Filter_Reducer_State.Filters_State,
  );
  const {
    Depart_Option_Lists,
    Sub_Depart_Option_Lists,
    Divide_Depart_Option_Lists,
  } = useSelector(
    (state) => state.Man_Day_Select_Option_Lists_State,
    shallowEqual,
  );

  const updateFilter = useCallback(
    (updates) => {
      dispatch(
        Insert_Man_Day_Select_Reducer_State_Func({
          ...Filter_State,
          ...updates,
        }),
      );
    },
    [dispatch, Filter_State],
  );

  const departOptions = useMemo(
    () =>
      Depart_Option_Lists.map((list) => ({
        value: list.itemCode,
        label: list.itemName,
      })),
    [Depart_Option_Lists],
  );

  const subDepartOptions = useMemo(
    () => generateOptions(Sub_Depart_Option_Lists, Filter_State?.depart?.value),
    [Sub_Depart_Option_Lists, Filter_State?.depart?.value],
  );

  const divideOptions = useMemo(
    () =>
      generateOptions(
        Divide_Depart_Option_Lists,
        Filter_State?.sub_depart?.value,
      ),
    [Divide_Depart_Option_Lists, Filter_State?.sub_depart?.value],
  );

  // 스페이스바 입력 방지
  const handleKeyDown = (event) => {
    if (event.key === " ") event.preventDefault();
  };

  const handleMenuOpenCheck = (dependency, message) => {
    if (!dependency) {
      toast.show({ title: message, successCheck: false, duration: 5000 });
    }
  };

  return (
    <TableFilterMainDivBox>
      <h2>조회</h2>
      <div className="Filter_Container">
        {/* 기간 */}
        <div className="Filter_GR">
          <div className="Filter_Title">기간</div>
          <div
            className="Filter_Content"
            style={{ display: "flex", alignItems: "center" }}
          >
            <DatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              shouldCloseOnSelect
              minDate={new Date("2000-01-01")}
              maxDate={new Date()}
              selected={Filter_State.period.start}
              onChange={(e) =>
                updateFilter({ period: { ...Filter_State.period, start: e } })
              }
            />
            <div style={{ margin: "0 10px" }}>~</div>
            <DatePicker
              locale={ko}
              dateFormat="yyyy-MM-dd"
              shouldCloseOnSelect
              minDate={new Date("2000-01-01")}
              selected={Filter_State.period.end}
              onChange={(e) =>
                updateFilter({ period: { ...Filter_State.period, end: e } })
              }
            />
          </div>
        </div>

        {/* 설비군 */}
        <div className="Filter_GR">
          <div className="Filter_Title">설비군</div>
          <div className="Filter_Content">
            <Select
              styles={customStyles}
              value={Filter_State.depart}
              options={departOptions}
              placeholder="선택해 주세요."
              isClearable
              onChange={(e) =>
                updateFilter({ depart: e, sub_depart: null, divide: null })
              }
            />
          </div>
        </div>

        {/* 설비명 */}
        <div className="Filter_GR">
          <div className="Filter_Title">설비명</div>
          <div className="Filter_Content">
            <Select
              styles={customStyles}
              value={Filter_State.sub_depart}
              options={subDepartOptions}
              placeholder="선택해 주세요."
              isClearable
              isDisabled={!Filter_State.depart}
              onKeyDown={handleKeyDown}
              onMenuOpen={() =>
                handleMenuOpenCheck(
                  Filter_State.depart,
                  "'설비군'을 먼저 선택 후 입력 가능합니다.",
                )
              }
              onChange={(e) => updateFilter({ sub_depart: e, divide: null })}
            />
          </div>
        </div>

        {/* 업무유형 */}
        <div className="Filter_GR">
          <div className="Filter_Title">업무 유형</div>
          <div className="Filter_Content">
            <Select
              styles={customStyles}
              value={Filter_State.divide}
              options={divideOptions}
              placeholder="선택해 주세요."
              isClearable
              isDisabled={!Filter_State.sub_depart}
              onMenuOpen={() =>
                handleMenuOpenCheck(
                  Filter_State.sub_depart,
                  "'설비명'을 먼저 선택 후 입력 가능합니다.",
                )
              }
              onChange={(e) => updateFilter({ divide: e })}
            />
          </div>
        </div>
      </div>

      <div className="Filter_Button_Group">
        <div className="Filter_Button_Container">
          <div className="Update_Button_Container">
            <button
              onClick={() => {
                dispatch(Initial_Man_Day_Select_Reducer_State_Func());
                Getting_Man_Day_Info_Data_Lists("initial");
              }}
            >
              초기화
            </button>
          </div>
          <div className="Save_Button_Container">
            <button
              style={{ background: "green" }}
              onClick={() => Getting_Man_Day_Info_Data_Lists()}
            >
              조회
            </button>
          </div>
        </div>
      </div>
    </TableFilterMainDivBox>
  );
};

export default TableFilter;
