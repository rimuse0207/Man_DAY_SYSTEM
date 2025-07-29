import React, { useEffect, useState } from 'react';
import SelectAllFilter from './Top/SelectAllFilter';
import styled from 'styled-components';
import { Request_Get_Axios } from '../../../../../../API';
import { useSelector } from 'react-redux';
import SelectTable from './Bottom/SelectTable';
import { initState } from '../../../../../../Models/ManDayReducers/ManDaySelectFilterReducer';
import Loader from '../../../../../Loader/Loader';
import * as XLSX from 'xlsx/xlsx.mjs';
import moment from 'moment';
import { toast } from '../../../../../ToastMessage/ToastManager';

const SelectAllMainPageMainDivBox = styled.div`
    padding-right: 10px;
`;
const SelectAllMainPage = () => {
    const [UserLists, setUserLists] = useState([]);
    const [PersonFilterOptions, setPersonFilterOptions] = useState([]);
    const [DepartmentFilterOptions, setDepartmentFilterOptions] = useState([]);
    const [Man_Day_Infos, setMan_Day_Infos] = useState([]);
    const [Loading_Check, setLoading_Check] = useState(false);
    const Filter_State = useSelector(state => state.Man_Day_Select_Filter_Reducer_State.Filters_State);
    useEffect(() => {
        Getting_Team_Member_Lists();
        Getting_Man_Day_Info_Data();
    }, []);

    const Getting_Team_Member_Lists = async () => {
        const Getting_Team_Member_Lists_Axios = await Request_Get_Axios('/API/PLM/Getting_Team_Member_All_Lists_For_Using_Filter_Options');
        if (Getting_Team_Member_Lists_Axios.status) {
            setPersonFilterOptions(
                Getting_Team_Member_Lists_Axios.data.Person_Options ? Getting_Team_Member_Lists_Axios.data.Person_Options : []
            );
            setDepartmentFilterOptions(
                Getting_Team_Member_Lists_Axios.data.Team_Options ? Getting_Team_Member_Lists_Axios.data.Team_Options : []
            );
        }
    };
    const Getting_Man_Day_Info_Data = async Select_Filter => {
        setLoading_Check(true);
        const Getting_Man_Day_Info_Data_Axios = await Request_Get_Axios('/API/PLM/Getting_Man_Day_Info_Data', {
            Filter_State: Select_Filter ? Select_Filter : Filter_State,
        });
        if (Getting_Man_Day_Info_Data_Axios.status) {
            setMan_Day_Infos(Getting_Man_Day_Info_Data_Axios.data);
        }
        setLoading_Check(false);
    };

    const Excel_Download = async () => {
        const workbook = XLSX.utils.book_new();

        // ✅ 1. 데이터 평탄화
        const flattenedData = [];

        Man_Day_Infos.forEach(data => {
            data.user_lists.forEach(item => {
                if (item.man_day.length > 0) {
                    item.man_day.forEach(re => {
                        flattenedData.push({
                            회사: item.company,
                            날짜: data.date,
                            팀: item.departmentName,
                            이름: item.name,
                            설비군: re.depart || '',
                            설비명: re.sub_depart || '',
                            업무유형: re.divideCode || '',
                            Man_Day: re.manDay || '',
                        });
                    });
                } else {
                    flattenedData.push({
                        회사: item.company,
                        날짜: data.date,
                        팀: item.departmentName,
                        이름: item.name,
                        설비군: '',
                        설비명: '',
                        업무유형: '',
                        Man_Day: '',
                    });
                }
            });
        });

        // ✅ 2. 시트 생성 및 엑셀 내보내기
        if (flattenedData.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(flattenedData);
            XLSX.utils.book_append_sheet(workbook, worksheet, `Man-Day`);

            toast.show({
                title: `Excel 다운로드 되었습니다.`,
                successCheck: true,
                duration: 6000,
            });

            XLSX.writeFile(workbook, `${moment().format('YYMMDD')}_Man-Day 데이터.xlsx`);
        } else {
            toast.show({
                title: `다운로드할 데이터가 없습니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    return (
        <SelectAllMainPageMainDivBox>
            <SelectAllFilter
                UserLists={UserLists}
                DepartmentFilterOptions={DepartmentFilterOptions}
                PersonFilterOptions={PersonFilterOptions}
                Getting_Man_Day_Info_Data={data => Getting_Man_Day_Info_Data(data)}
                Excel_Download={() => Excel_Download()}
            ></SelectAllFilter>
            <SelectTable Man_Day_Infos={Man_Day_Infos}></SelectTable>
            <Loader loading={Loading_Check}></Loader>
        </SelectAllMainPageMainDivBox>
    );
};

export default SelectAllMainPage;
