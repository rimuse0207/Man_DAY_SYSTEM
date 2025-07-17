import React, { useEffect, useState } from 'react';
import CommonFilters from '../CommonFilters/CommonFilters';
import { PersonMainPageMainDivBox } from '../Person/PersonMainPage';
import { Request_Get_Axios } from '../../../../../../../API';
import { useSelector } from 'react-redux';
import BarGraph from '../Person/BarGraph';
import PieGraph from './PieGraph';

const CompanyMainPage = ({ menuCode }) => {
    const Filter_State = useSelector(state => state.Man_Day_Select_Filter_Reducer_State.Filters_State);
    const [depart_Bar_State, setdepart_Bar_State] = useState([]);
    const [sub_depart_Bar_State, setsub_depart_Bar_State] = useState([]);
    useEffect(() => {
        Getting_Company_Data();
    }, []);
    const Getting_Company_Data = async () => {
        try {
            const Getting_Company_Data_Axios = await Request_Get_Axios('/API/PLM/Getting_Company_Data', {
                Filter_State,
            });
            if (Getting_Company_Data_Axios.status) {
                console.log(Getting_Company_Data_Axios);
                setdepart_Bar_State(Getting_Company_Data_Axios.data.depart_Bar_Data);
                setsub_depart_Bar_State(Getting_Company_Data_Axios.data.sub_depart_Bar_Data);
            }
            console.log(Getting_Company_Data_Axios);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PersonMainPageMainDivBox>
            <CommonFilters menuCode={menuCode} Getting_Person_Bar_State={() => Getting_Company_Data()}></CommonFilters>
            <h3 style={{ textAlign: 'center' }}>
                {Filter_State.company.value === 'all' ? 'YC & EXICON' : Filter_State.company.value} Man_day
            </h3>
            <BarGraph Bar_State={depart_Bar_State}></BarGraph>
            <BarGraph Bar_State={sub_depart_Bar_State}></BarGraph>
            <div>{/* <PieGraph></PieGraph> */}</div>
        </PersonMainPageMainDivBox>
    );
};

export default CompanyMainPage;
