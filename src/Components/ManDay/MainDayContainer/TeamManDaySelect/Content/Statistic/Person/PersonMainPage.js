import React, { useEffect, useState } from 'react';
import CommonFilters from '../CommonFilters/CommonFilters';
import { Request_Get_Axios } from '../../../../../../../API';
import { useSelector } from 'react-redux';
import BarGraph from './BarGraph';

const PersonMainPage = ({ menuCode }) => {
    const [Bar_State, setBar_State] = useState([]);
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
                setBar_State(Getting_Person_Bar_State_Axios.data);
            }
            console.log(Getting_Person_Bar_State_Axios);
        }
    };
    return (
        <div style={{ paddingRight: '20px' }}>
            <CommonFilters menuCode={menuCode} Getting_Person_Bar_State={() => Getting_Person_Bar_State()}></CommonFilters>
            <div>
                <BarGraph Bar_State={Bar_State}></BarGraph>
            </div>
        </div>
    );
};

export default PersonMainPage;
