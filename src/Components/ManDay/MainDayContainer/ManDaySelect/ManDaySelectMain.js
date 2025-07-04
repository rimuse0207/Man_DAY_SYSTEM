import React, { useEffect, useState } from 'react';
import Table from './Contents/Table';
import { Request_Get_Axios } from '../../../../API';
import TableFilter from './Contents/TableFilter';
const ManDaySelectMain = () => {
    const [Table_State, setTable_State] = useState([]);
    useEffect(() => {
        Getting_Man_Day_Info_Data_Lists();
    }, []);

    const Getting_Man_Day_Info_Data_Lists = async () => {
        const Getting_Man_Day_Info_Data_Lists_Axios = await Request_Get_Axios('/API/PLM/Getting_Man_Day_Info_Data_Lists');
        if (Getting_Man_Day_Info_Data_Lists_Axios.status) {
            setTable_State(Getting_Man_Day_Info_Data_Lists_Axios.data);
        }
    };

    return (
        <div style={{ paddingRight: '20px' }}>
            <TableFilter></TableFilter>
            <Table Table_State={Table_State}></Table>
        </div>
    );
};

export default ManDaySelectMain;
