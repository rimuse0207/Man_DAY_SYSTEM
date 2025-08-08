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
    const [department_Pie_State, setdepartment_Pie_State] = useState([]);
    const [gradbounce_Pie_State, setgradbounce_Pie_State] = useState([]);
    const [CompanyInfos, setCompanyInfos] = useState({ value: 'all', label: '전체' });

    useEffect(() => {
        Getting_Company_Data();
    }, []);
    const Getting_Company_Data = async () => {
        try {
            const Getting_Company_Data_Axios = await Request_Get_Axios('/API/PLM/Getting_Company_Data', {
                Filter_State,
            });
            if (Getting_Company_Data_Axios.status) {
                setdepart_Bar_State(Getting_Company_Data_Axios.data.depart_Bar_Data);
                setsub_depart_Bar_State(Getting_Company_Data_Axios.data.sub_depart_Bar_Data);
                setdepartment_Pie_State(Getting_Company_Data_Axios.data.User_Counting_Pie_Data);
                setgradbounce_Pie_State(Getting_Company_Data_Axios.data.Based_Annual_Leave_User_Count_Pie_Data);
                setCompanyInfos(Filter_State.company);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PersonMainPageMainDivBox>
            <CommonFilters menuCode={menuCode} Getting_Person_Bar_State={() => Getting_Company_Data()}></CommonFilters>
            <div className="User_Info_Container">
                <div className="User_Content_Container">
                    <span>총원 : </span>
                    <span>{gradbounce_Pie_State.reduce((pre, acc) => pre + acc.value, 0)}명</span>
                </div>
            </div>
            {CompanyInfos?.value ? (
                <h3 style={{ textAlign: 'center' }}>{CompanyInfos.value === 'all' ? 'YC & EXICON' : CompanyInfos.value} Man_day</h3>
            ) : (
                <></>
            )}
            <BarGraph Bar_State={depart_Bar_State}></BarGraph>
            <BarGraph Bar_State={sub_depart_Bar_State}></BarGraph>
            <h3 style={{ textAlign: 'center' }}>
                {Filter_State.company.value === 'all' ? 'YC & EXICON' : Filter_State.company.value} 인력 구성
            </h3>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <PieGraph Pie_State={department_Pie_State}></PieGraph>
                </div>
                <div style={{ width: '50%' }}>
                    <PieGraph Pie_State={gradbounce_Pie_State.filter(item => item.value > 0)}></PieGraph>
                </div>
            </div>
        </PersonMainPageMainDivBox>
    );
};

export default CompanyMainPage;
