import React, { useCallback } from 'react';
import styled from 'styled-components';

// Styled Components
const Overlay = styled.div`
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

const Modal = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    min-width: 520px;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-in-out;

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

const Message = styled.p`
    font-size: 16px;
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ConfirmButton = styled.button`
    background: ${props => (props.BackColors ? props.BackColors : '#ff4d4d')};
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    flex: 1;
    margin-right: 10px;

    &:hover {
        background: ${props => (props.hoverBackColors ? props.hoverBackColors : '#cc0000;')};
    }
`;

const CancelButton = styled.button`
    background: #ddd;
    color: black;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    flex: 1;

    &:hover {
        background: #bbb;
    }
`;

const ConfirmModal = ({ isOpen, onClose, onConfirm, onMessage, onSubMessage, BackColors, hoverBackColors }) => {
    if (!isOpen) return null;

    return (
        <Overlay>
            <Modal>
                <Message>{onMessage}</Message>
                {onSubMessage ? <Message>{onSubMessage}</Message> : <></>}

                <ButtonContainer>
                    <ConfirmButton BackColors={BackColors} hoverBackColors={hoverBackColors} onClick={onConfirm}>
                        확인
                    </ConfirmButton>
                    <CancelButton onClick={onClose}>아니요</CancelButton>
                </ButtonContainer>
            </Modal>
        </Overlay>
    );
};

export default React.memo(ConfirmModal);
