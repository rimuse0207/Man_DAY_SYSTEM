import React from 'react';
import { HomeClockStatusMainPageMainDivBox } from '../HomeClock/HomeClock';
import { useSelector } from 'react-redux';

const Info = () => {
    const Login_Info = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    return (
        <HomeClockStatusMainPageMainDivBox>
            {' '}
            <div className="MainBodyContent_Left_WorkCheck">
                <div className="MainBodyContent_Left_WorkCheckDesc">
                    <div>
                        <span style={{ color: '#535559' }}>{Login_Info.team}</span>
                    </div>
                    <div className="TimerContainer">
                        <h2>
                            {Login_Info.name} {Login_Info.position}
                        </h2>

                        {/* <div className="TimerContainer_WorkStatus"></div> */}
                    </div>
                    {/* {workStatusMenuBar ? <div className="Open_WorkingStatus_Container"></div> : <div></div>} */}
                </div>
            </div>
        </HomeClockStatusMainPageMainDivBox>
    );
};

export default Info;
