import React, { useEffect, useState, useMemo } from "react";
import {
  customStyles,
  SelectAllFilterMainDivBox,
} from "../../SelectAll/Top/SelectAllFilter";
import { TableFilterMainDivBox } from "../../../../ManDaySelect/Contents/TableFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  Initial_Man_Day_Select_Reducer_State_Func,
  Insert_Man_Day_Select_Reducer_State_Func,
} from "../../../../../../../Models/ManDayReducers/ManDaySelectFilterReducer";
import Select from "react-select";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import { TbHierarchy3 } from "react-icons/tb";
import PersonSelectModal from "./PersonSelectModal/PersonSelectModal";
import DepartSelectModal from "./DepartSelectModal/DepartSelectModal";
import { useApi } from "../../../../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../../../../API/config";

const CommonFilters = ({ menuCode, Getting_Person_Bar_State }) => {
  const dispatch = useDispatch();

  const [personFilterOptions, setPersonFilterOptions] = useState([]);
  const [statisticEquipmentOptions, setStatisticEquipmentOptions] = useState(
    [],
  );

  const [personSelectModalIsOpen, setPersonSelectModalIsOpen] = useState(false);
  const [departSelectModalIsOpen, setDepartSelectModalIsOpen] = useState(false);

  const filterState = useSelector(
    (state) => state.Man_Day_Select_Filter_Reducer_State.Filters_State,
  );

  const { request: getEquipmentListOptions } = useApi(
    API_CONFIG.TeamLeaderAPI.GET_EQUIPMENT_LIST_FOR_OPTION,
  );
  const { request: getMemberListOptions } = useApi(
    API_CONFIG.TeamLeaderAPI.GET_MEMBER_LIST_FOR_OPTIONS,
  );

  useEffect(() => {
    fetchEquipmentLists();
    fetchTeamMemberLists();
  }, []);

  const fetchEquipmentLists = () => {
    getEquipmentListOptions(
      {},
      {
        onSuccess: (data) => setStatisticEquipmentOptions(data),
      },
    );
  };

  const fetchTeamMemberLists = () => {
    getMemberListOptions(
      {},
      {
        onSuccess: (data) => setPersonFilterOptions(data.Person_Options || []),
      },
    );
  };

  const updateFilter = (updates) => {
    dispatch(
      Insert_Man_Day_Select_Reducer_State_Func({ ...filterState, ...updates }),
    );
  };

  const filteredEquipmentOptions = useMemo(() => {
    if (!filterState.equipment_company?.value) return [];
    return statisticEquipmentOptions.filter(
      (item) => item.company === filterState.equipment_company.value,
    );
  }, [statisticEquipmentOptions, filterState.equipment_company]);

  return (
    <SelectAllFilterMainDivBox style={{ height: "200px" }}>
      <TableFilterMainDivBox>
        <h2>조회</h2>
        <div className="Filter_Container">
          {/* 기간 필터 (공통) */}
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
                selected={filterState.period.start}
                onChange={(e) =>
                  updateFilter({ period: { ...filterState.period, start: e } })
                }
              />
              <div style={{ margin: "0 10px" }}>~</div>
              <DatePicker
                locale={ko}
                dateFormat="yyyy-MM-dd"
                shouldCloseOnSelect
                minDate={new Date("2000-01-01")}
                maxDate={new Date()}
                selected={filterState.period.end}
                onChange={(e) =>
                  updateFilter({ period: { ...filterState.period, end: e } })
                }
              />
            </div>
          </div>

          {menuCode === "Team" && (
            <div className="Filter_GR">
              <div className="Filter_Title">팀, 파트</div>
              <div className="Filter_Content">
                <input
                  value={filterState.statisticTeam?.itemName || ""}
                  placeholder="선택된 팀,파트가 없습니다."
                  onClick={() => setDepartSelectModalIsOpen(true)}
                  readOnly
                />
              </div>
            </div>
          )}

          {menuCode === "Person" && (
            <div className="Filter_GR">
              <div className="Filter_Title">이름</div>
              <div className="Filter_Content" style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <Select
                    styles={customStyles}
                    value={filterState.name}
                    isClearable
                    options={personFilterOptions}
                    onChange={(e) => updateFilter({ name: e })}
                    placeholder="선택 해 주세요."
                  />
                </div>

                <div
                  className="Search_Icon_Container"
                  onClick={() => setPersonSelectModalIsOpen(true)}
                >
                  <TbHierarchy3 />
                </div>
              </div>
            </div>
          )}

          {menuCode === "Company" && (
            <div className="Filter_GR">
              <div className="Filter_Title">회사명</div>
              <div className="Filter_Content">
                <Select
                  styles={customStyles}
                  value={filterState.company}
                  options={[
                    { value: "all", label: "전체" },
                    { value: "YC", label: "와이씨(YC)" },
                    { value: "EXICON", label: "엑시콘(EXICON)" },
                  ]}
                  onChange={(e) => updateFilter({ company: e })}
                  placeholder="선택 해 주세요."
                />
              </div>
            </div>
          )}

          {(menuCode === "Equipments" || menuCode === "Salary") && (
            <>
              <div className="Filter_GR">
                <div className="Filter_Title">회사명</div>
                <div className="Filter_Content">
                  <Select
                    styles={customStyles}
                    value={filterState.equipment_company}
                    options={[
                      { value: "YC", label: "와이씨(YC)" },
                      { value: "EXICON", label: "엑시콘(EXICON)" },
                    ]}
                    onChange={(e) =>
                      updateFilter({ equipment_company: e, sub_depart: null })
                    }
                    placeholder="선택 해 주세요."
                  />
                </div>
              </div>
              <div className="Filter_GR">
                <div className="Filter_Title">설비명</div>
                <div className="Filter_Content">
                  <Select
                    styles={customStyles}
                    value={filterState.sub_depart}
                    options={filteredEquipmentOptions}
                    isDisabled={!filterState.equipment_company}
                    isClearable
                    onChange={(e) => updateFilter({ sub_depart: e })}
                    placeholder="선택 해 주세요."
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* 하단 버튼 영역 */}
        <div className="Filter_Button_Group">
          <div className="Filter_Button_Container">
            <div className="Update_Button_Container">
              <button
                onClick={() =>
                  dispatch(Initial_Man_Day_Select_Reducer_State_Func())
                }
              >
                초기화
              </button>
            </div>
            <div className="Save_Button_Container">
              <button
                style={{ background: "green" }}
                onClick={Getting_Person_Bar_State}
              >
                조회
              </button>
            </div>
          </div>
        </div>
      </TableFilterMainDivBox>

      {personSelectModalIsOpen && (
        <PersonSelectModal onClose={() => setPersonSelectModalIsOpen(false)} />
      )}

      {departSelectModalIsOpen && (
        <DepartSelectModal onClose={() => setDepartSelectModalIsOpen(false)} />
      )}
    </SelectAllFilterMainDivBox>
  );
};

export default CommonFilters;
