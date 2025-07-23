import React from 'react';
import styled from 'styled-components';

const DepartmentInfoMainDivBox = styled.div`
    width: 95%;
    input {
        border: 1px solid lightgray;
        height: 35px;
        width: 300px;
        border-radius: 5px;
        padding-left: 10px;
    }
    button {
        border: 1px solid lightgray;
        padding: 10px;
        margin-left: 20px;
        border-radius: 5px;
        padding-left: 20px;
        padding-right: 20px;
        &:hover {
            cursor: pointer;
            opacity: 0.7;
        }
    }
`;

const DepartmentInfo = ({ NowSelect, Update_Mode, setUpdate_Mode, New_DepartMent_State, setNew_DepartMent_State, Add_Department_Data }) => {
    return Update_Mode ? (
        <DepartmentInfoMainDivBox>
            <div className="Content_Container">
                <div style={{ paddingRight: '20px' }}>
                    {'     '} 부 {'     '} 서 {'     '} 명 {'     '}
                </div>
                <div>
                    <input value={New_DepartMent_State} onChange={e => setNew_DepartMent_State(e.target.value)}></input>
                </div>
            </div>
            <div className="Content_Container">
                <div>상위부서명</div>
                <div>
                    <input value={NowSelect?.itemName} readOnly></input>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'end',
                }}
            >
                <div>
                    <button onClick={() => setUpdate_Mode(false)}>취소</button>
                </div>
                <div>
                    <button onClick={() => Add_Department_Data()}>추가</button>
                </div>
            </div>
        </DepartmentInfoMainDivBox>
    ) : (
        <>
            {' '}
            <div className="Content_Container">
                <div style={{ width: '200px' }}>부 서 명</div>
                <div>{NowSelect?.itemName}</div>
            </div>
            <div className="Content_Container">
                <div style={{ width: '200px' }}>부서코드</div>
                <div>{NowSelect?.itemCode}</div>
            </div>
            <div className="Content_Container">
                <div style={{ width: '200px' }}>상위 부서 코드</div>
                <div>{NowSelect?.parentCode}</div>
            </div>
            <div className="Content_Container">
                <div></div>
                <div></div>
            </div>
        </>
    );
};

export default DepartmentInfo;
