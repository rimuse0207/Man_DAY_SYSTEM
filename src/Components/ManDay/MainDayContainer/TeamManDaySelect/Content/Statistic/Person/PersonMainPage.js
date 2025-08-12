import React, { useEffect, useState } from 'react';
import CommonFilters from '../CommonFilters/CommonFilters';
import { Request_Get_Axios } from '../../../../../../../API';
import { useSelector } from 'react-redux';
import BarGraph from './BarGraph';
import styled from 'styled-components';

export const PersonMainPageMainDivBox = styled.div`
    padding-right: 20px;
    .User_Info_Container {
        display: flex;
        .User_Content_Container {
            border: 1px solid lightgray;
            padding: 5px;
            margin-right: 20px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 5px;
            background-color: lightgray;
            font-weight: bolder;
        }
    }
`;

const PersonMainPage = ({ menuCode }) => {
    const [Bar_State, setBar_State] = useState([]);
    const [User_Info_State, setUser_Info_State] = useState(null);
    const Filter_State = useSelector(state => state.Man_Day_Select_Filter_Reducer_State.Filters_State);
    useEffect(() => {
        Getting_Person_Bar_State();
    }, []);
    const Getting_Person_Bar_State = async () => {
        if (Filter_State.name) {
            const Getting_Person_Bar_State_Axios = await Request_Get_Axios('/API/PLM/Getting_Person_Bar_State', {
                Filter_State,
            });
            if (Getting_Person_Bar_State_Axios.status) {
                setBar_State(Getting_Person_Bar_State_Axios.data.BarGraphData);
                setUser_Info_State(Getting_Person_Bar_State_Axios.data.Personal_Infos_SQL);
            }
        }
    };
    return (
        <PersonMainPageMainDivBox>
            <CommonFilters menuCode={menuCode} Getting_Person_Bar_State={() => Getting_Person_Bar_State()}></CommonFilters>
            <div className="User_Info_Container">
                <div className="User_Content_Container">
                    <span>연차 : </span>
                    <span>{User_Info_State?.user_gradebounce}년</span>
                </div>
                <div className="User_Content_Container">
                    <span>호봉 : </span>
                    <span>{User_Info_State?.user_salarygrade}</span>
                </div>
                <div className="User_Content_Container">
                    <span>파트 : </span>
                    <span>{User_Info_State?.user_department}</span>
                </div>
            </div>
            <div>
                <h2 style={{ textAlign: 'center' }}>{User_Info_State?.name} Man_day</h2>
                <BarGraph Bar_State={Bar_State}></BarGraph>
            </div>
            <div style={{ padding: '20px' }}></div>
        </PersonMainPageMainDivBox>
    );
};

export default PersonMainPage;
