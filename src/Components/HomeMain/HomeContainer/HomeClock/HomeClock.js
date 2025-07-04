import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { IoIosArrowDown } from 'react-icons/io';
import { BsArrowUpCircle, BsArrowDownCircle } from 'react-icons/bs';
import 'moment/locale/ko';
import SafeLicenseMainContainer from './HomeCard/HomeCardMainContainer';
import HomeCardMainContainer from './HomeCard/HomeCardMainContainer';

export const HomeClockStatusMainPageMainDivBox = styled.div`
    margin-top: 20px;
    .Open_WorkingStatus_Container {
        margin-top: 20px;
    }
    .WorkStatusClicksMenuFloat {
        margin-bottom: 20px;
        ::after {
            display: block;
            clear: both;
            content: '';
        }
        .WorkStatusClicksMenuLeft {
            float: left;
            border-right: 1px solid lightgray;
            width: 50%;
            text-align: center;
            .WorkStatusClicksMenuLeft_icons {
                font-size: 2em;
                svg {
                    color: #2985db;
                }
            }
        }
        .WorkStatusClicksMenuRight {
            float: right;
            width: 50%;
            text-align: center;
            padding-right: 10px;
            .WorkStatusClicksMenuRight_icons {
                font-size: 2em;
                svg {
                    color: #2985db;
                }
            }
        }
    }
    .WorkStatusClicksMenuLists {
        padding-right: 15px;
        width: 95%;
        margin: 0 auto;
        ul {
            display: flex;
            flex-flow: wrap;
            justify-content: space-between;
            li {
                width: 45%;
                border: 1px solid lightgray;
                text-align: center;
                border-radius: 5px;
                height: 40px;
                line-height: 40px;
                margin-bottom: 10px;
                :hover {
                    cursor: pointer;
                    background-color: #efefef;
                }
            }
        }
    }
    .TimerContainer {
        margin-left: 10px;
    }
`;
const HomeClock = () => {
    let timer = null;
    const [time, setTime] = useState(moment());
    const [workStatusMenuBar, setWorkStatusMenuBar] = useState(true);
    useEffect(() => {
        timer = setInterval(() => {
            setTime(moment());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <HomeClockStatusMainPageMainDivBox>
            <div className="MainBodyContent_Left_WorkCheck">
                <div className="MainBodyContent_Left_WorkCheckDesc">
                    <div>
                        <span style={{ color: '#535559' }}>{moment().locale('ko').format('M월 D일 (dd)')}</span>
                    </div>
                    <div className="TimerContainer">
                        <h2>{time.format('HH:mm:ss')}</h2>
                        <div className="TimerContainer_WorkStatus"></div>
                        <div
                            className={workStatusMenuBar ? 'TimerContainer_WorkStatusArrowUp' : 'TimerContainer_WorkStatusArrowDown'}
                            onClick={() => setWorkStatusMenuBar(!workStatusMenuBar)}
                        >
                            <IoIosArrowDown></IoIosArrowDown>
                        </div>
                    </div>
                    {workStatusMenuBar ? (
                        <div className="Open_WorkingStatus_Container">{/* <HomeCardMainContainer></HomeCardMainContainer> */}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </HomeClockStatusMainPageMainDivBox>
    );
};

export default HomeClock;
