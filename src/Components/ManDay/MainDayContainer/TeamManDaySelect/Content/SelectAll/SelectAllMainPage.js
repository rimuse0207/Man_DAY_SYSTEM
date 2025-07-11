import React, { useEffect, useState } from 'react';
import SelectAllFilter from './Top/SelectAllFilter';
import styled from 'styled-components';
import { Request_Get_Axios } from '../../../../../../API';
import { useSelector } from 'react-redux';

const SelectAllMainPageMainDivBox = styled.div`
    padding-right: 10px;
`;
const SelectAllMainPage = () => {
    const [UserLists, setUserLists] = useState([]);
    const [PersonFilterOptions, setPersonFilterOptions] = useState([]);
    const [DepartmentFilterOptions, setDepartmentFilterOptions] = useState([]);
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
    const Getting_Man_Day_Info_Data = async () => {
        const Getting_Man_Day_Info_Data_Axios = await Request_Get_Axios('/API/PLM/Getting_Man_Day_Info_Data', {
            Filter_State,
        });
    };
    return (
        <SelectAllMainPageMainDivBox>
            <SelectAllFilter
                UserLists={UserLists}
                DepartmentFilterOptions={DepartmentFilterOptions}
                PersonFilterOptions={PersonFilterOptions}
            ></SelectAllFilter>
        </SelectAllMainPageMainDivBox>
    );
};

export default SelectAllMainPage;
