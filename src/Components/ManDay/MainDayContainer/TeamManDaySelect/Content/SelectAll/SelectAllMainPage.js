import React, { useEffect, useState } from "react";
import SelectAllFilter from "./Top/SelectAllFilter";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SelectTable from "./Bottom/SelectTable";
import { useApi } from "../../../../../Common/Hooks/useApi";
import { API_CONFIG } from "../../../../../../API/config";

import {
  exportGeneralManDayExcel,
  exportDevOpsManDayExcel,
} from "./ExcelExportManager";

const SelectAllMainPageMainDivBox = styled.div`
  padding-right: 10px;
`;

const SelectAllMainPage = () => {
  const [personFilterOptions, setPersonFilterOptions] = useState([]);
  const [departmentFilterOptions, setDepartmentFilterOptions] = useState([]);
  const [manDayInfos, setManDayInfos] = useState([]);

  const filterState = useSelector(
    (state) => state.Man_Day_Select_Filter_Reducer_State.Filters_State,
  );

  const { request: getMemberListOption } = useApi(
    API_CONFIG.TeamLeaderAPI.GET_TEAM_MEMBER_LIST_FOR_OPTIONS,
  );
  const { request: getAllManDayData } = useApi(
    API_CONFIG.TeamLeaderAPI.GET_ALL_MAN_DAY_DATA,
  );
  const { request: downloadExcelForDevelopOperate } = useApi(
    API_CONFIG.TeamLeaderAPI.DOWNLOAD_EXCEL_FOR_DEVELOP_OPERATE,
  );

  useEffect(() => {
    fetchTeamMemberLists();
    fetchManDayInfoData();
  }, []);

  const fetchTeamMemberLists = () => {
    getMemberListOption(
      {},
      {
        onSuccess: (data) => {
          setPersonFilterOptions(data.Person_Options || []);
          setDepartmentFilterOptions(data.Team_Options || []);
        },
      },
    );
  };

  const fetchManDayInfoData = async (selectFilter) => {
    getAllManDayData(
      { Filter_State: selectFilter || filterState },
      { onSuccess: (data) => setManDayInfos(data) },
    );
  };

  // 1. 일반 관리자 Excel 다운로드
  const handleExcelDownload = () => {
    exportGeneralManDayExcel(manDayInfos);
  };

  // 2. 개발운영팀 Excel 다운로드
  const handleDevelopOperateExcelDownload = () => {
    downloadExcelForDevelopOperate(
      { Filter_State: filterState },
      {
        onSuccess: (data) => {
          exportDevOpsManDayExcel(data);
        },
      },
    );
  };

  return (
    <SelectAllMainPageMainDivBox>
      <SelectAllFilter
        DepartmentFilterOptions={departmentFilterOptions}
        PersonFilterOptions={personFilterOptions}
        Getting_Man_Day_Info_Data={fetchManDayInfoData}
        Excel_Download={handleExcelDownload}
        Develop_Operate_Excel_Download={handleDevelopOperateExcelDownload}
      />
      <SelectTable Man_Day_Infos={manDayInfos} />
    </SelectAllMainPageMainDivBox>
  );
};

export default SelectAllMainPage;
