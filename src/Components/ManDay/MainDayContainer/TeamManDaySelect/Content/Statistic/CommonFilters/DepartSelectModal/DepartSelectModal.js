import React, { useEffect, useState } from 'react';
import ParentTree from '../../../../../../../User/Department/TreeMenu/ParentTree';
import { UserContentMainPageButtonContainer } from '../../../../../../../User/User/UserContentMainPage';
import { UserModalMainDivBox } from '../../../../../../../User/User/Contents/UserModal';
import { Modal, Overlay } from '../../../../../../../User/Department/Contents/Modal/DepartmentMoveModal';
import { Request_Get_Axios } from '../../../../../../../../API';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Insert_Man_Day_Select_Reducer_State_Func } from '../../../../../../../../Models/ManDayReducers/ManDaySelectFilterReducer';

const ButtonContainer = styled.div`
    text-align: end;
    button {
        padding: 8px 13px;
        border: 1px solid lightgray;
        margin-left: 20px;
        border-radius: 5px;
        background-color: #fff;
        font-weight: bolder;
        &:hover {
            cursor: pointer;
            opacity: 0.7;
        }
    }
`;

const DepartSelectModal = ({ onClose, Select_Types, Input_User_Info, setInput_User_Info }) => {
    const dispatch = useDispatch();
    const Filter_State = useSelector(state => state.Man_Day_Select_Filter_Reducer_State.Filters_State);
    const [Department_State, setDepartment_State] = useState([]);
    const [NowSelect, setNowSelect] = useState(null);

    useEffect(() => {
        Getting_DepartMent_Lists_Data();
    }, []);

    const Getting_DepartMent_Lists_Data = async () => {
        const Man_Day_Team_Select_Making_Tree_Structure_Axios = await Request_Get_Axios(
            '/API/PLM/Man_Day_Team_Select_Making_Tree_Structure'
        );
        if (Man_Day_Team_Select_Making_Tree_Structure_Axios.status) {
            setDepartment_State(Man_Day_Team_Select_Making_Tree_Structure_Axios.data);
        }
    };

    const Selected_Team_Part_Data = async () => {
        if (Select_Types === 'team') {
            dispatch(
                Insert_Man_Day_Select_Reducer_State_Func({
                    ...Filter_State,
                    team: { value: NowSelect.itemCode, label: NowSelect.itemName },
                })
            );
        } else if (Select_Types === 'user') {
            setInput_User_Info({
                ...Input_User_Info,
                department: {
                    value: NowSelect.itemCode,
                    label: NowSelect.itemName,
                },
            });
        } else {
            dispatch(
                Insert_Man_Day_Select_Reducer_State_Func({
                    ...Filter_State,
                    statisticTeam: { itemCode: NowSelect.itemCode, itemName: NowSelect.itemName, divideType: NowSelect.divideType },
                })
            );
        }

        onClose();
    };

    return (
        <Overlay>
            <Modal style={{ width: '40%' }}>
                <UserModalMainDivBox>
                    <div className="Float_Top_Container">
                        <UserContentMainPageButtonContainer>
                            <div>
                                <h3>팀 & 파트 선택</h3>
                            </div>
                        </UserContentMainPageButtonContainer>
                    </div>
                    <div></div>
                    <div className="All_Container" style={{ height: 'calc(90vh - 100px)' }}>
                        <div className="Left_Content" style={{ height: 'calc(90vh - 200px)', width: '100%', overflow: 'auto' }}>
                            <ParentTree
                                TreeMenu={Department_State}
                                setDepartment_State={data => setDepartment_State(data)}
                                NowSelect={NowSelect}
                                setNowSelect={data => setNowSelect(data)}
                            ></ParentTree>
                        </div>
                        <ButtonContainer>
                            <button onClick={() => onClose()}>취소</button>

                            <button onClick={() => Selected_Team_Part_Data()}>선택</button>
                        </ButtonContainer>
                    </div>
                </UserModalMainDivBox>
            </Modal>
        </Overlay>
    );
};

export default DepartSelectModal;
