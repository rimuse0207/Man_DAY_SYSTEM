import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { ko } from 'date-fns/esm/locale';
import { toast } from '../../../ToastMessage/ToastManager';
import { Request_Post_Axios } from '../../../../API';
import moment from 'moment';
const HolidayInputMainPageMainDivBox = styled.div`
    padding-left: 10px;
    padding-right: 5px;
    .Input_Containers {
        margin-top: 20px;
        .Input_Box {
            margin-bottom: 20px;
            input {
                border: 1px solid lightgray;
                border-radius: 5px;
                padding-left: 10px;
                width: 300px;
                height: 40px;
            }
        }
    }
    .Add_Button_Contaier {
        text-align: end;
        button {
            border: 1px solid lightgray;
            padding: 5px 10px;
            border-radius: 5px;
            background-color: #fff;
            &:hover {
                cursor: pointer;
                opacity: 0.7;
            }
        }
    }
`;

const HolidayInputMainPage = ({ Getting_Holiday_Lists }) => {
    const [Select_Date, setSelect_Date] = useState(new Date());
    const [Input_Name, setInput_Name] = useState('');

    const Handle_Add_Holiday_Data = async () => {
        if (Input_Name === '') {
            toast.show({
                title: `공휴일 이름을 작성해 주세요.`,
                successCheck: false,
                duration: 6000,
            });
            return;
        }

        const Handle_Add_Holiday_Data_Axios = await Request_Post_Axios('/API/PLM/user/Handle_Add_Holiday_Data', {
            Select_Date,
            Input_Name,
        });

        if (Handle_Add_Holiday_Data_Axios.status) {
            if (Handle_Add_Holiday_Data_Axios.data.dupleChecking) {
                toast.show({
                    title: `공휴일이 이미 등록되어 있습니다. 다시 확인 바랍니다.`,
                    successCheck: false,
                    duration: 6000,
                });
                return;
            } else {
                await Getting_Holiday_Lists();
                toast.show({
                    title: `${moment(Select_Date).format('YYYY-MM-DD')}를 공휴일로 지정하였습니다.`,
                    successCheck: true,
                    duration: 6000,
                });
                setInput_Name('');
            }
        } else {
            toast.show({
                title: `오류발생. IT팀에 문의바랍니다.`,
                successCheck: false,
                duration: 6000,
            });
        }
    };

    return (
        <HolidayInputMainPageMainDivBox>
            <h3>공휴일 수기 등록</h3>
            <div className="Input_Containers">
                <div className="Input_Box">
                    <div>날짜선택</div>
                    <div>
                        <DatePicker
                            locale={ko}
                            selected={Select_Date}
                            dateFormat="yyyy-MM-dd"
                            onChange={e => setSelect_Date(e)}
                            placeholder="날짜를 선택 해 주세요."
                            shouldCloseOnSelect
                        ></DatePicker>
                    </div>
                </div>
                <div className="Input_Box">
                    <div>공휴일 이름</div>
                    <div>
                        <input
                            value={Input_Name}
                            onChange={e => setInput_Name(e.target.value)}
                            placeholder="공휴일 이름을 작성해 주세요."
                        ></input>
                    </div>
                </div>
            </div>
            <div className="Add_Button_Contaier">
                <button onClick={() => Handle_Add_Holiday_Data()}>추가</button>
            </div>
        </HolidayInputMainPageMainDivBox>
    );
};

export default HolidayInputMainPage;
