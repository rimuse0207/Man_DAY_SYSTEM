import React, { useEffect, useState } from 'react';
import { Modal, Overlay } from '../../Department/Contents/Modal/DepartmentMoveModal';
import Select from 'react-select';
import { Request_Get_Axios, Request_Post_Axios } from '../../../../API';
import { toast } from '../../../ToastMessage/ToastManager';
import { UserModalMainDivBox } from '../../User/Contents/UserModal';
import { UserContentMainPageButtonContainer } from '../../User/UserContentMainPage';
import ParentTree from '../../Department/TreeMenu/ParentTree';
import SelectDepartment from '../../Department/Contents/SelectDepartment';
import UserTable from './UserTable';

const styles = {
    control: provided => ({
        ...provided,
        height: '40px',
    }),
    valueContainer: provided => ({
        ...provided,
        height: '40px',
    }),
    indicatorsContainer: provided => ({
        ...provided,
        height: '40px',
    }),
};

const AccessUserModal = ({ onClose, Now_Select_Menu }) => {
    const [NowSelect, setNowSelect] = useState(null);
    const [Department_State, setDepartment_State] = useState([]);
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
        <Overlay>
            <Modal>
                <UserModalMainDivBox>
                    <div className="Float_Top_Container">
                        <UserContentMainPageButtonContainer>
                            <div>
                                <h3>사용자 선택</h3>
                            </div>
                            <button
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                취소
                            </button>
                        </UserContentMainPageButtonContainer>
                    </div>
                    <div></div>
                    <div className="All_Container">
                        <div className="Left_Content">
                            <ParentTree
                                TreeMenu={Department_State}
                                setDepartment_State={data => setDepartment_State(data)}
                                NowSelect={NowSelect}
                                setNowSelect={data => setNowSelect(data)}
                            ></ParentTree>
                        </div>
                        <div className="Right_Content">
                            <UserTable NowSelect={NowSelect} Now_Select_Menu={Now_Select_Menu}></UserTable>
                        </div>
                    </div>
                </UserModalMainDivBox>
            </Modal>
        </Overlay>
    );
};
export default AccessUserModal;
