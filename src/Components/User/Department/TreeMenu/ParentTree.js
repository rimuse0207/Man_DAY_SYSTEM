import React, { useEffect, useState } from 'react';
import Tree from './Tree';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { openMenusToTarget } from './TreeFunction';

export const SbContainer = styled.div`
    width: auto;
    height: auto;
    min-height: 70vh;
    font-size: 12px;
`;

const ParentTree = ({ TreeMenu, setDepartment_State, NowSelect, setNowSelect }) => {
    console.log(TreeMenu, setDepartment_State, NowSelect, setNowSelect);
    return (
        <SbContainer>
            {TreeMenu.map((list, index) => {
                return (
                    <Tree
                        TreeMenu={TreeMenu}
                        setDepartment_State={data => setDepartment_State(data)}
                        list={list}
                        NowSelect={NowSelect}
                        setNowSelect={data => setNowSelect(data)}
                        key={list.menu_code}
                    ></Tree>
                );
            })}
        </SbContainer>
    );
};
export default ParentTree;
