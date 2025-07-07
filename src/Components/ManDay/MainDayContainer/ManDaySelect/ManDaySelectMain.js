import React, { useEffect, useState } from 'react';
import Table from './Contents/Table';
import { Request_Get_Axios } from '../../../../API';
import TableFilter from './Contents/TableFilter';
import { useSelector } from 'react-redux';
import Loader from '../../../Loader/Loader';
import { initState } from '../../../../Models/ManDayReducers/ManDaySelectFilterReducer';
const ManDaySelectMain = () => {
    const Filter_State = useSelector(state => state.Man_Day_Select_Filter_Reducer_State.Filters_State);
    const [Table_State, setTable_State] = useState([]);
    const [Loading_Check, setLoading_Check] = useState(false);
    useEffect(() => {
        Getting_Man_Day_Info_Data_Lists();
    }, []);

    const Getting_Man_Day_Info_Data_Lists = async data => {
        setLoading_Check(true);
        if (data === 'initial') {
            const Getting_Man_Day_Info_Data_Lists_Axios = await Request_Get_Axios('/API/PLM/Getting_Man_Day_Info_Data_Lists', {
                Filter_State: initState.Filters_State,
            });
            if (Getting_Man_Day_Info_Data_Lists_Axios.status) {
                setTable_State(Getting_Man_Day_Info_Data_Lists_Axios.data);
            }
        } else {
            const Getting_Man_Day_Info_Data_Lists_Axios = await Request_Get_Axios('/API/PLM/Getting_Man_Day_Info_Data_Lists', {
                Filter_State,
            });
            if (Getting_Man_Day_Info_Data_Lists_Axios.status) {
                setTable_State(Getting_Man_Day_Info_Data_Lists_Axios.data);
            }
        }

        setLoading_Check(false);
    };

    return (
        <div style={{ paddingRight: '20px' }}>
            <TableFilter Getting_Man_Day_Info_Data_Lists={data => Getting_Man_Day_Info_Data_Lists(data)}></TableFilter>
            <Table Table_State={Table_State}></Table>
            <Loader loading={Loading_Check}></Loader>
        </div>
    );
};

export default ManDaySelectMain;
