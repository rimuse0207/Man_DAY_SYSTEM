import React, { useState } from 'react';
import PersonMainPage from './Person/PersonMainPage';
import CompanyMainPage from './Company/CompanyMainPage';
import EquipmentsMainPage from './Equipments/EquipmentsMainPage';
import TeamMainPage from './Team/TeamMainPage';

const StatisticMainPage = () => {
    const [Menu_Lists, setMenu_Lists] = useState([
        { menuName: '인원', menuCode: 'Person', Component: <PersonMainPage menuCode="Person" /> },
        { menuName: '회사', menuCode: 'Company', Component: <CompanyMainPage menuCode="Company" /> },
        { menuName: '장비', menuCode: 'Equipments', Component: <EquipmentsMainPage menuCode="Equipments" /> },
        { menuName: '팀', menuCode: 'Team', Component: <TeamMainPage menuCode="Team" /> },
    ]);
    const [Now_Select_Menu, setNow_Select_Menu] = useState('Person');
    return (
        <div>
            <ul>
                {Menu_Lists.map(list => {
                    return (
                        <li
                            onClick={() => setNow_Select_Menu(list.menuCode)}
                            style={Now_Select_Menu === list.menuCode ? { borderBottom: '2px solid black', color: 'black' } : {}}
                            key={list.menuCode}
                        >
                            {list.menuName}
                        </li>
                    );
                })}
            </ul>
            {Menu_Lists.filter(item => item.menuCode === Now_Select_Menu).map(list => {
                return <div key={list.menuCode}>{list.Component}</div>;
            })}
        </div>
    );
};

export default StatisticMainPage;
