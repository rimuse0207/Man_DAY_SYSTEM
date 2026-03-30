import React, { useEffect, useMemo, useState } from "react";
import { TableFilterMainDivBox } from "../../../../ManDaySelect/Contents/TableFilter";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Initial_Man_Day_Select_Reducer_State_Func,
  initState,
  Insert_Man_Day_Select_Reducer_State_Func,
} from "../../../../../../../Models/ManDayReducers/ManDaySelectFilterReducer";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import { toast } from "../../../../../../ToastMessage/ToastManager";
import { TbHierarchy3 } from "react-icons/tb";
import DepartSelectModal from "../../Statistic/CommonFilters/DepartSelectModal/DepartSelectModal";
import { accessCheck } from "../../../../../../Common/Utils/ManDay/sortingOptions";

export const SelectAllFilterMainDivBox = styled.div`
  .Filter_Container {
    margin-bottom: 20px;
    justify-content: start;
    .Filter_GR {
      margin-bottom: 30px;
      margin-right: 10px;
      margin-left: 10px;
      width: 18%;
      min-width: 200px !important;
    }
  }
`;
export const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "40px",
    height: "40px",
    fontSize: "12px",
    padding: "0 4px",
    display: "flex",
    alignItems: "center",
    lineHeight: "1.2",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "40px",
    padding: "0 4px",
    display: "flex",
    alignItems: "center",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "40px",
    display: "flex",
    alignItems: "center",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    lineHeight: "1.2",
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "12px",
    padding: "6px 8px",
    lineHeight: "1.5",
  }),
};

const SelectAllFilter = ({
  PersonFilterOptions,
  DepartmentFilterOptions,
  Getting_Man_Day_Info_Data,
  Excel_Download,
  Develop_Operate_Excel_Download,
}) => {
  const dispatch = useDispatch();
  const Login_Info = useSelector(
    (state) => state.Login_Info_Reducer_State.Login_Info,
  );
  const hasAccess = accessCheck(Login_Info);

  const {
    Depart_Option_Lists,
    Sub_Depart_Option_Lists,
    Divide_Depart_Option_Lists,
  } = useSelector(
    (state) => state.Man_Day_Select_Option_Lists_State,
    shallowEqual,
  );

  const Filter_State = useSelector(
    (state) => state.Man_Day_Select_Filter_Reducer_State.Filters_State,
  );

  const [departSelectModalIsOpen, setDepartSelectModalIsOpen] = useState(false);

  const updateFilter = (updates) => {
    dispatch(
      Insert_Man_Day_Select_Reducer_State_Func({ ...Filter_State, ...updates }),
    );
  };

  const departOptions = useMemo(
    () =>
      Depart_Option_Lists.map((list) => ({
        value: list.itemCode,
        label: list.itemName,
      })),
    [Depart_Option_Lists],
  );

  const subDepartOptions = useMemo(() => {
    if (!Filter_State?.depart?.value) return [];
    return Sub_Depart_Option_Lists.filter(
      (item) => item.itemParentCode === Filter_State.depart.value,
    )
      .sort((a, b) => a.itemRank - b.itemRank)
      .map((list) => ({ value: list.itemCode, label: list.itemName }));
  }, [Sub_Depart_Option_Lists, Filter_State?.depart]);

  const divideOptions = useMemo(() => {
    if (!Filter_State?.sub_depart?.value) return [];
    return Divide_Depart_Option_Lists.filter(
      (item) => item.itemParentCode === Filter_State.sub_depart.value,
    )
      .sort((a, b) => a.itemRank - b.itemRank)
      .map((list) => ({ value: list.itemCode, label: list.itemName }));
  }, [Divide_Depart_Option_Lists, Filter_State?.sub_depart]);

  const handleMenuOpenCheck = (dependency, message) => {
    if (!dependency) {
      toast.show({ title: message, successCheck: false, duration: 5000 });
    }
  };

  return (
    <SelectAllFilterMainDivBox>
      <TableFilterMainDivBox>
        <h2>조회</h2>
        <div className="Filter_Container">
          {/* 기간 필터 */}
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

          {/* 회사명 / 팀명 / 이름 필터 (단순 헬퍼 적용으로 코드 단축) */}
          <div className="Filter_GR">
            <div className="Filter_Title">회사명</div>
            <div className="Filter_Content">
              <Select
                styles={customStyles}
                value={Filter_State.company}
                isClearable
                options={[
                  { value: "all", label: "전체" },
                  { value: "cp01", label: "와이씨(YC)" },
                  { value: "cp02", label: "엑시콘(EXICON)" },
                ]}
                onChange={(e) => updateFilter({ company: e })}
                placeholder="선택해 주세요."
              />
            </div>
          </div>

          <div className="Filter_GR">
            <div className="Filter_Title">팀명</div>
            <div className="Filter_Content" style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <Select
                  styles={customStyles}
                  value={Filter_State.team}
                  isClearable
                  options={DepartmentFilterOptions}
                  onChange={(e) => updateFilter({ team: e })}
                  placeholder="선택해 주세요."
                />
              </div>
              <div
                className="Search_Icon_Container"
                onClick={() => setDepartSelectModalIsOpen(true)}
              >
                <TbHierarchy3 />
              </div>
            </div>
          </div>

          <div className="Filter_GR">
            <div className="Filter_Title">이름</div>
            <div className="Filter_Content">
              <Select
                styles={customStyles}
                value={Filter_State.name}
                isClearable
                options={PersonFilterOptions}
                onChange={(e) => updateFilter({ name: e })}
                placeholder="선택해 주세요."
              />
            </div>
          </div>

          {/* 설비군 / 설비명 / 업무 유형 필터 */}
          <div className="Filter_GR">
            <div className="Filter_Title">설비군</div>
            <div className="Filter_Content">
              <Select
                styles={customStyles}
                value={Filter_State.depart}
                isClearable
                options={departOptions}
                onChange={(e) =>
                  updateFilter({ depart: e, sub_depart: null, divide: null })
                }
                placeholder="선택해 주세요."
              />
            </div>
          </div>

          <div className="Filter_GR">
            <div className="Filter_Title">설비명</div>
            <div className="Filter_Content">
              <Select
                styles={customStyles}
                value={Filter_State.sub_depart}
                isClearable
                options={subDepartOptions}
                isDisabled={!Filter_State.depart}
                onChange={(e) => updateFilter({ sub_depart: e, divide: null })}
                onMenuOpen={() =>
                  handleMenuOpenCheck(
                    Filter_State.depart,
                    "'설비군'을 먼저 선택 후 입력 가능합니다.",
                  )
                }
                placeholder="선택해 주세요."
              />
            </div>
          </div>

          <div className="Filter_GR">
            <div className="Filter_Title">업무 유형</div>
            <div className="Filter_Content">
              <Select
                styles={customStyles}
                value={Filter_State.divide}
                isClearable
                options={divideOptions}
                isDisabled={!Filter_State.sub_depart}
                onMenuOpen={() =>
                  handleMenuOpenCheck(
                    Filter_State.sub_depart,
                    "'설비명'을 먼저 선택 후 입력 가능합니다.",
                  )
                }
                onChange={(e) => updateFilter({ divide: e })}
                placeholder="선택해 주세요."
              />
            </div>
          </div>

          <div className="Filter_GR">
            <div className="Filter_Title">입력여부</div>
            <div className="Filter_Content">
              <Select
                styles={customStyles}
                value={Filter_State.inputCheck}
                isClearable
                onChange={(e) => {
                  if (e?.value === "OFF") {
                    updateFilter({
                      inputCheck: e,
                      divide: null,
                      sub_depart: null,
                      depart: null,
                    });
                  } else {
                    updateFilter({ inputCheck: e });
                  }
                }}
                options={[
                  { value: "ON", label: "입력완료" },
                  { value: "OFF", label: "미입력" },
                ]}
                placeholder="선택해 주세요."
              />
            </div>
          </div>
        </div>

        <div className="Filter_Button_Group">
          <div className="Filter_Button_Container">
            {hasAccess && (
              <div className="Update_Button_Container">
                <button
                  onClick={Develop_Operate_Excel_Download}
                  style={{
                    width: "200px",
                    backgroundColor: "#fff",
                    color: "black",
                    border: "1px solid lightgray",
                    fontWeight: "bolder",
                  }}
                >
                  개발운영팀 엑셀 내보내기
                </button>
              </div>
            )}

            <div className="Update_Button_Container">
              <button
                onClick={Excel_Download}
                style={{ width: "150px", backgroundColor: "#368" }}
              >
                엑셀 내보내기
              </button>
            </div>

            <div className="Update_Button_Container">
              <button
                onClick={async () => {
                  dispatch(Initial_Man_Day_Select_Reducer_State_Func());
                  await Getting_Man_Day_Info_Data(initState.Filters_State);
                }}
              >
                초기화
              </button>
            </div>

            <div className="Save_Button_Container">
              <button
                style={{ background: "green" }}
                onClick={() => Getting_Man_Day_Info_Data()}
              >
                조회
              </button>
            </div>
          </div>
        </div>
      </TableFilterMainDivBox>

      {departSelectModalIsOpen && (
        <DepartSelectModal
          onClose={() => setDepartSelectModalIsOpen(false)}
          Select_Types="team"
        />
      )}
    </SelectAllFilterMainDivBox>
  );
};

export default SelectAllFilter;
