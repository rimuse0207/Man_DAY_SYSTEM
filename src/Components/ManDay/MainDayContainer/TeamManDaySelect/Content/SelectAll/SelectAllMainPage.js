import React, { useEffect, useState } from 'react';
import SelectAllFilter from './Top/SelectAllFilter';
import styled from 'styled-components';
import { Request_Get_Axios, Request_Post_Axios } from '../../../../../../API';
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

    // 일반 관리자 Excel 다운로드
    const Excel_Download = async () => {
        const workbook = XLSX.utils.book_new();

        // ✅ 1. 데이터 평탄화
        const flattenedData = [];

        Man_Day_Infos.forEach(async data => {
            data.user_lists.forEach(async item => {
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

    // 개발운영팀 Excel 다운로드
    const Develop_Operate_Excel_Download = async () => {
        const Develop_Operate_Excel_Download_Axios = await Request_Get_Axios('/API/PLM/Develop_Operate_Excel_Download', {
            Filter_State,
        });
        if (Develop_Operate_Excel_Download_Axios.status) {
            await Develop_Operate_Making_Excel(Develop_Operate_Excel_Download_Axios.data);
        }
    };

    const Develop_Operate_Making_Excel = async Selected_Data => {
        const workbook = XLSX.utils.book_new();

        // ✅ 1. 데이터 평탄화
        const flattenedData = [];

        const Intern_Change = Selected_Data.map(list => {
            return {
                ...list,
                gradebounceww: list.gradebounceName === '인턴' ? 1 : list.gradebounceName,
            };
        });

        Intern_Change.forEach(data => {
            flattenedData.push({
                년도: data.year,
                월: data.month,
                회사: data.companyName,
                직군: data.occupationalName,
                팀: data.TeamdepartmentName,
                파트: data.departmentName,
                이름: data.Name,
                설비군: data.departName,
                설비명: data.subDepartName,
                업무유형: data.divideName,
                MM: `${(Number(data.sum_man_day / data.counts / 8) * 100).toFixed(5)} %`,
                연차구분: dusckrnqns(data.gradebounceww),
                연차: data.gradebounceName,
                호봉: data.salarygradeName,
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

            XLSX.writeFile(workbook, `개발운영팀 ${moment().format('YYMMDD')}_Man-Day 데이터.xlsx`);
        } else {
            toast.show({
                title: `다운로드할 데이터가 없습니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    const dusckrnqns = selected => {
        const User_Rank = [
            {
                name: '01~04년',
                min_rank: 1,
                max_rank: 4,
            },
            {
                name: '05~09년',
                min_rank: 5,
                max_rank: 9,
            },
            {
                name: '10~14년',
                min_rank: 10,
                max_rank: 14,
            },
            {
                name: '15년 이상',
                min_rank: 15,
                max_rank: 50,
            },
        ];

        const [a] = User_Rank.filter(list => {
            if (Number(selected) >= list.min_rank && Number(selected) <= list.max_rank) {
                return list.name;
            }
        });
        return a.name;
    };

    return (
        <SelectAllMainPageMainDivBox>
            <SelectAllFilter
                UserLists={UserLists}
                DepartmentFilterOptions={DepartmentFilterOptions}
                PersonFilterOptions={PersonFilterOptions}
                Getting_Man_Day_Info_Data={data => Getting_Man_Day_Info_Data(data)}
                Excel_Download={() => Excel_Download()}
                Develop_Operate_Excel_Download={() => Develop_Operate_Excel_Download()}
            ></SelectAllFilter>
            <SelectTable Man_Day_Infos={Man_Day_Infos}></SelectTable>
            <Loader loading={Loading_Check}></Loader>
        </SelectAllMainPageMainDivBox>
    );
};

export default SelectAllMainPage;
