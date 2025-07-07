import React, { useEffect, useState } from 'react';
import { Request_Get_Axios } from '../../../API';
import ParentTree from './TreeMenu/ParentTree';
import styled from 'styled-components';
import SelectDepartment from './Contents/SelectDepartment';

const DepartmentMainPageMainDivBox = styled.div`
    .All_Container {
        ::after {
            display: block;
            content: '';
            clear: both;
        }
        .Left_Content {
            border-right: 1px solid lightgray;
            border-left: 1px solid lightgray;
            width: 20%;
            padding: 10px;
            float: left;
            button {
                border: 1px solid lightgray;
                padding: 5px;
                border-radius: 5px;
                background-color: #fff;
                padding-left: 10px;
                padding-right: 10px;
            }
        }
        .Right_Content {
            padding-right: 10px;
            float: right;
            width: 80%;
        }
    }
`;

const DepartmentMainPage = () => {
    const [Department_State, setDepartment_State] = useState([]);
    const [NowSelect, setNowSelect] = useState(null);
    const [Select_Menus, setSelect_Menus] = useState('company');
    useEffect(() => {
        Getting_Department_Data();
    }, []);
    const Getting_Department_Data = async () => {
        const Getting_Department_Data_Axios = await Request_Get_Axios('/API/PLM/user/Getting_Department_Data');
        if (Getting_Department_Data_Axios.status) {
            setDepartment_State(Getting_Department_Data_Axios.data);
        }
    };
    return (
        <DepartmentMainPageMainDivBox>
            <div style={{ borderBottom: '1px solid lightgray', paddingBottom: '10px' }}>
                <h2>부서</h2>
                <div style={{ fontSize: '0.8em', marginTop: '10px', color: 'gray' }}>부서 정보를 조회/관리할 수 있습니다.</div>
            </div>
            <div className="All_Container">
                <div className="Left_Content">
                    <div style={{ textAlign: 'end', marginBottom: '10px' }}>
                        <button> 추 가 </button>
                    </div>
                    <ParentTree
                        TreeMenu={Department_State}
                        setDepartment_State={data => setDepartment_State(data)}
                        NowSelect={NowSelect}
                        setNowSelect={data => setNowSelect(data)}
                    ></ParentTree>
                </div>
                <div className="Right_Content">
                    <SelectDepartment
                        Select_Menus={Select_Menus}
                        setSelect_Menus={data => setSelect_Menus(data)}
                        NowSelect={NowSelect}
                    ></SelectDepartment>
                </div>
            </div>
        </DepartmentMainPageMainDivBox>
    );
};

export default DepartmentMainPage;
