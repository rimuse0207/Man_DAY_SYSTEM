import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ParentTree from '../../TreeMenu/ParentTree';

// Styled Components
export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const Modal = styled.div`
    background: white;
    padding: 20px;
    padding-top: 0px;
    border-radius: 10px;
    width: 80%;
    height: 90vh;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-in-out;
    overflow: auto;
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const Message = styled.p`
    font-size: 16px;
    margin-bottom: 20px;
`;

export const ButtonContainer = styled.div``;

export const CancelButton = styled.button`
    background-color: ${props => (props.backColors ? props.backColors : 'lightgray')};
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    flex: 1;
    width: 130px;
    height: 50px;
    margin-right: 10px;
    margin-bottom: 10px;
    &:hover {
        background-color: ${props => (props.hoverBackColors ? props.hoverBackColors : 'lightgray')};
    }
`;

const ConfirmApply = ({ isOpen, onClose, Department_State, setDepartment_State, NowSelect, setNowSelect, Update_User_Info_Data }) => {
    const Navigate = useNavigate();
    if (!isOpen) return null;

    return (
        <Overlay>
            <Modal>
                <Message>이동하실 부서를 클릭 해 주세요.</Message>
                <div>
                    <div>
                        <ParentTree
                            TreeMenu={Department_State}
                            setDepartment_State={data => setDepartment_State(data)}
                            NowSelect={NowSelect}
                            setNowSelect={data => setNowSelect(data)}
                        ></ParentTree>
                    </div>
                    <div></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <ButtonContainer>
                        <CancelButton backColors="#ddd" hoverBackColors="#bbb" onClick={onClose}>
                            취소
                        </CancelButton>
                    </ButtonContainer>
                    <ButtonContainer>
                        <CancelButton backColors="#8eff00" hoverBackColors="#04e200" onClick={Update_User_Info_Data}>
                            변경
                        </CancelButton>
                    </ButtonContainer>
                </div>
            </Modal>
        </Overlay>
    );
};

export default React.memo(ConfirmApply);
