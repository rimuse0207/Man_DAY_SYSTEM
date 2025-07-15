import React, { useEffect, useState } from 'react';
import { Request_Get_Axios, Request_Post_Axios } from '../../../API';
import ParentTree from './TreeMenu/ParentTree';
import styled from 'styled-components';
import SelectDepartment from './Contents/SelectDepartment';
import { toast } from '../../ToastMessage/ToastManager';

export const DepartmentMainPageMainDivBox = styled.div`
    .All_Container {
        height: calc(100vh - 160px);
        overflow: auto;
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
            height: calc(100vh - 160px);
            overflow: auto;
            .Button_Containers {
                text-align: end;
                position: sticky;
                top: 0px;
                width: 100%;
            }
            button {
                border: 1px solid lightgray;
                padding: 5px;
                border-radius: 5px;
                background-color: #fff;
                padding-left: 10px;
                padding-right: 10px;
                &:hover {
                    cursor: pointer;
                }
            }
        }
        .Right_Content {
            padding-right: 10px;
            float: right;
            width: 80%;
            height: 100%;
            overflow: auto;
        }
    }
`;

const DepartmentMainPage = () => {
    const [Department_State, setDepartment_State] = useState([]);
    const [NowSelect, setNowSelect] = useState(null);
    const [Select_Menus, setSelect_Menus] = useState('user');
    const [Update_Mode, setUpdate_Mode] = useState(false);
    const [New_DepartMent_State, setNew_DepartMent_State] = useState('');
    useEffect(() => {
        Getting_Department_Data();
    }, []);

    // 부서 조직도 불러오기
    const Getting_Department_Data = async () => {
        const Getting_Department_Data_Axios = await Request_Get_Axios('/API/PLM/user/Getting_Department_Data');
        if (Getting_Department_Data_Axios.status) {
            setDepartment_State(Getting_Department_Data_Axios.data);
        }
    };

    // 부서 추가
    const Add_Department_Data = async () => {
        const Add_Department_Data_Axios = await Request_Post_Axios('/API/PLM/user/Add_Department_Data', {
            New_DepartMent_State,
            NowSelect,
        });
        if (Add_Department_Data_Axios.status) {
            toast.show({
                title: `${New_DepartMent_State}의 부서를 추가하였습니다.`,
                successCheck: true,
                duration: 6000,
            });
            setUpdate_Mode(false);
            Getting_Department_Data();
            setNew_DepartMent_State('');
        } else {
            toast.show({
                title: `오류가 발생하였습니다. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
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
                    <div className="Button_Containers">
                        <button onClick={() => setUpdate_Mode(true)}> 추 가 </button>
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
                        New_DepartMent_State={New_DepartMent_State}
                        setNew_DepartMent_State={data => setNew_DepartMent_State(data)}
                        Update_Mode={Update_Mode}
                        setUpdate_Mode={() => setUpdate_Mode(false)}
                        Department_State={Department_State}
                        setDepartment_State={data => setDepartment_State(data)}
                        Select_Menus={Select_Menus}
                        setSelect_Menus={data => setSelect_Menus(data)}
                        NowSelect={NowSelect}
                        Add_Department_Data={() => Add_Department_Data()}
                    ></SelectDepartment>
                </div>
            </div>
        </DepartmentMainPageMainDivBox>
    );
};

export default DepartmentMainPage;
