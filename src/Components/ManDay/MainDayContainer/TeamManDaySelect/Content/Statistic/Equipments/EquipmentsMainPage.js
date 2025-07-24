import React, { useEffect, useState } from 'react';
import CommonFilters from '../CommonFilters/CommonFilters';
import { useSelector } from 'react-redux';
import { Request_Get_Axios } from '../../../../../../../API';
import BarGraph from '../Person/BarGraph';
import PieGraph from '../Company/PieGraph';
import { PersonMainPageMainDivBox } from '../Person/PersonMainPage';

const EquipmentsMainPage = ({ menuCode }) => {
    const Filter_State = useSelector(state => state.Man_Day_Select_Filter_Reducer_State.Filters_State);
    const [Now_Equipment, setNow_Equipment] = useState(null);
    const [Bar_State, setBar_State] = useState([]);
    const [Pie_State, setPie_State] = useState([]);
    const [gradbounce_Pie_State, setgradbounce_Pie_State] = useState([]);
    const [users_Expenses, setusers_Expenses] = useState(null);
    useEffect(() => {
        Getting_Equipment_Bar_State();
    }, []);
    const Getting_Equipment_Bar_State = async () => {
        if (Filter_State.sub_depart) {
            const Getting_Person_Bar_State_Axios = await Request_Get_Axios('/API/PLM/Getting_Equipments_Bar_State', {
                Filter_State,
            });
            if (Getting_Person_Bar_State_Axios.status) {
                setusers_Expenses(Getting_Person_Bar_State_Axios.data.userExpense);
                setNow_Equipment(Filter_State?.sub_depart?.label);
                setBar_State(Getting_Person_Bar_State_Axios.data.BarGraphData);
                setPie_State(Getting_Person_Bar_State_Axios.data.PieGraphData);
                setgradbounce_Pie_State(Getting_Person_Bar_State_Axios.data.Equipment_Based_Annual_Leave_User_Count);
            }
        }
    };
    return (
        <PersonMainPageMainDivBox>
            <CommonFilters menuCode={menuCode} Getting_Person_Bar_State={() => Getting_Equipment_Bar_State()}></CommonFilters>
            <div className="User_Info_Container">
                <div className="User_Content_Container">
                    <span>총원 : </span>
                    <span>{gradbounce_Pie_State.reduce((pre, acc) => pre + acc.value, 0)}명</span>
                </div>
                <div className="User_Content_Container">
                    <span>인건비 : </span>
                    <span>{users_Expenses ? Number(users_Expenses).toFixed(2) : ''}만원</span>
                </div>
            </div>
            <div>
                <h2 style={{ textAlign: 'center' }}>{Now_Equipment} 공수정보</h2>
                <BarGraph Bar_State={Bar_State}></BarGraph>
            </div>
            <h3 style={{ textAlign: 'center' }}>개발 인력 구성</h3>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                    <PieGraph Pie_State={Pie_State}></PieGraph>
                </div>
                <div style={{ width: '50%' }}>
                    <PieGraph Pie_State={gradbounce_Pie_State.filter(item => item.value > 0)}></PieGraph>
                </div>
            </div>
        </PersonMainPageMainDivBox>
    );
};

export default EquipmentsMainPage;
