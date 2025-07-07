import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { HiChevronUp } from 'react-icons/hi';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openMenusToTarget } from './TreeFunction';
import { TbPencilExclamation } from 'react-icons/tb';

// 사이드바 전체를 감싸는 div
export const SbContainer = styled.div`
    min-width: 16rem;
    width: auto;
    height: auto;
    min-height: 70vh;
    font-size: 14px;
`;

// SbItem에서 하위메뉴들을 묶어줄 div
export const SbSub = styled.div`
    overflow: hidden;
    max-height: ${props => (props.isOpen ? '100%' : '0')};
`;

// 메뉴명을 보여줄 div
export const SbTitle = styled.div`
    display: flex;
    align-items: center;
    padding-left: ${props => props.depth * 20}px;
    min-height: 32px;
    color: gray;
    background-color: ${props => (props.NowChecked ? 'lightgray' : '')};
    margin-bottom: 5px;
    &:hover {
        background-color: #f6f6f2;
        cursor: pointer;
        border-right: solid 5px;
    }
    .Menu_Icons {
        color: blue;
        font-size: 10px;
        margin-right: 10px;
        font-weight: bolder;
        line-height: 0px;
    }
`;

export const UpdateContentMode = styled.span`
    margin-left: 20px;
    color: green;
    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }
`;

const Tree = ({ TreeMenu, setDepartment_State, list, depth = 0, NowSelect, setNowSelect }) => {
    const toggleMenu = (data, targetCode) => {
        return data.map(item => {
            if (item.itemCode === targetCode) {
                return { ...item, menu_open: !item.menu_open };
            }

            // 자식이 있는 경우에만 재귀 호출
            if (Array.isArray(item.children) && item.children.length > 0) {
                return {
                    ...item,
                    children: toggleMenu(item.children, targetCode),
                };
            }

            return item;
        });
    };

    const toggleCollapse = (e, list) => {
        e.preventDefault();
        e.stopPropagation();
        setNowSelect(list);
        const updatedData = toggleMenu(TreeMenu, list.itemCode);
        setDepartment_State(updatedData);
    };

    const hasChildren = Array.isArray(list.children) && list.children.length > 0;

    if (list.children.length > 0) {
        return (
            <div>
                <SbTitle
                    depth={depth}
                    onClick={e => toggleCollapse(e, list)}
                    style={
                        NowSelect?.itemCode === list.itemCode
                            ? { color: 'blue', fontWeight: 'bolder', background: 'RGB(239, 244, 252)' }
                            : {}
                    }
                >
                    <span className="Menu_Icons">{list.menu_open ? <FaMinus /> : <FaPlus />}</span>
                    <span>{list.itemName}</span>
                </SbTitle>
                <SbSub isOpen={list.menu_open}>
                    {list.children.map(child => {
                        return (
                            <Tree
                                key={child.itemCode}
                                TreeMenu={TreeMenu}
                                setDepartment_State={data => setDepartment_State(data)}
                                list={child}
                                NowSelect={NowSelect}
                                setNowSelect={data => setNowSelect(data)}
                                depth={depth + 1}
                            />
                        );
                    })}
                </SbSub>
            </div>
        );
    } else {
        return (
            <>
                <SbTitle
                    depth={depth}
                    onClick={e => toggleCollapse(e, list)}
                    style={
                        NowSelect?.itemCode === list.itemCode
                            ? { color: 'blue', fontWeight: 'bolder', background: 'RGB(239, 244, 252)' }
                            : {}
                    }
                >
                    <span>{list.itemName}</span>
                </SbTitle>
            </>
        );
    }
};
export default React.memo(Tree);
