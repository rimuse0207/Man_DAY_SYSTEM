import React from 'react';
import styled from 'styled-components';
import DepartmentInfo from './DepartmentInfo';
import UsersInfo from './UsersInfo';

const SelectDepartmentMainDivBox = styled.div`
    .Menu_Container {
        ul {
            display: flex;
            flex-flow: wrap;
            padding-left: 20px;
            border-bottom: 1px solid lightgray;
            li {
                padding: 10px;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
    .Content_Info_Container {
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        width: 100%;
        .Content_Container {
            width: 40%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
`;

const SelectDepartment = ({
    Select_Menus,
    setSelect_Menus,
    NowSelect,
    Department_State,
    setDepartment_State,
    Update_Mode,
    setUpdate_Mode,
    New_DepartMent_State,
    setNew_DepartMent_State,
    Add_Department_Data,
}) => {
    return (
        <SelectDepartmentMainDivBox>
            <div className="Menu_Container">
                <ul>
                    <li style={Select_Menus === 'user' ? { borderBottom: '2px solid black' } : {}} onClick={() => setSelect_Menus('user')}>
                        <h4>부서원 정보</h4>
                    </li>
                    <li
                        style={Select_Menus === 'company' ? { borderBottom: '2px solid black' } : {}}
                        onClick={() => setSelect_Menus('company')}
                    >
                        <h4>부서 정보</h4>
                    </li>
                </ul>
            </div>
            <div className="Content_Info_Container">
                {Select_Menus === 'company' ? (
                    <DepartmentInfo
                        NowSelect={NowSelect}
                        Update_Mode={Update_Mode}
                        setUpdate_Mode={() => setUpdate_Mode(false)}
                        New_DepartMent_State={New_DepartMent_State}
                        setNew_DepartMent_State={data => setNew_DepartMent_State(data)}
                        Add_Department_Data={() => Add_Department_Data()}
                    ></DepartmentInfo>
                ) : (
                    <></>
                )}
                {Select_Menus === 'user' ? (
                    <UsersInfo
                        Department_State={Department_State}
                        NowSelect={NowSelect}
                        setDepartment_State={data => setDepartment_State(data)}
                    ></UsersInfo>
                ) : (
                    <></>
                )}
            </div>
        </SelectDepartmentMainDivBox>
    );
};

export default SelectDepartment;
