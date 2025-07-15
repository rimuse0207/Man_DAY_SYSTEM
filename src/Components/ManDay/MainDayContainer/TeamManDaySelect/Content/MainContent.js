import React, { useState } from 'react';
import styled from 'styled-components';
import SelectWeekMainPage from './SelectWeek/SelectWeekMainPage';
import SelectAllMainPage from './SelectAll/SelectAllMainPage';
import StatisticMainPage from './Statistic/StatisticMainPage';

const MainContentMainDivBox = styled.div`
    height: 100%;
    ul {
        display: flex;
        padding: 10px;
        padding-bottom: 0px;
        border-bottom: 1px solid lightgray;
        li {
            margin-right: 20px;
            font-weight: bolder;
            padding-bottom: 10px;
            padding-left: 10px;
            padding-right: 10px;
            color: gray;
        }
    }
`;

const MainContent = () => {
    const [Menu_Lists, setMenu_Lists] = useState([
        { menuName: '금주 조회', menuCode: 'selectWeek', Component: <SelectWeekMainPage /> },
        { menuName: '전체 조회', menuCode: 'selectAll', Component: <SelectAllMainPage /> },
        { menuName: ' 통 계 ', menuCode: 'statistic', Component: <StatisticMainPage /> },
    ]);
    const [Now_Select_Menu, setNow_Select_Menu] = useState('selectWeek');
    return (
        <MainContentMainDivBox>
            <ul>
                {Menu_Lists.map(list => {
                    return (
                        <li
                            style={Now_Select_Menu === list.menuCode ? { borderBottom: '2px solid black', color: 'black' } : {}}
                            onClick={() => setNow_Select_Menu(list.menuCode)}
                        >
                            {list.menuName}
                        </li>
                    );
                })}
            </ul>
            {Menu_Lists.filter(item => item.menuCode === Now_Select_Menu).map(list => {
                return list.Component;
            })}
        </MainContentMainDivBox>
    );
};

export default MainContent;
