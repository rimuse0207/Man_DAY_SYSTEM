import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BsFillPersonFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
// import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MdLogout } from 'react-icons/md';
import { FaKey } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Logout_Inistate_State_Func } from '../../../Models/LoginInfoReducer/LoginInfoReduce';

const NavigationMainPageMainDivBox = styled.div`
    position: sticky;
    height: 80px;
    width: 100%;
    padding: 0 20px 0 24px;
    border-bottom: 1px solid #dadce0;
    z-index: 2;
    background: white;
    .NavigationMainFlexdiv {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        width: 96%;
        margin: 0 auto;
    }
    .Navigation_Icons {
        width: 60px;
        height: 60px;
        background-color: lightgray;
        border-radius: 50%;
        background-size: cover;
        box-shadow: 0px 0px 3px 5px lightgray;
        background-repeat: repeat;
        background-position-y: center;

        svg {
            padding: 10px;
            width: 100%;
            height: 100%;
            color: darkgray;
        }
    }
    .Main_Logo_Container {
        position: relative;
        .Main_Menu_Move_Container {
            position: absolute;
            right: -400px;
            top: 5px;
            width: 300px;
        }
    }
`;

export const MenuContainer = styled.div`
    position: relative;
`;

const UserButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    border: none;
    background: transparent;
`;

const UserImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #ccc;
`;

export const DropdownMenu = styled.div`
    position: absolute;
    right: -10px;
    /* margin-top: 50px; */

    width: 150px;
    background: lightgray;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 8px 0;
    z-index: 10;
`;

export const MenuItemss = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    background: transparent;
    border: none;
    text-align: left;
    font-weight: bolder;
    cursor: pointer;
    &:hover {
        background: #f5f5f5;
    }
`;

const Icon = styled.span`
    margin-right: 8px;
    display: flex;
    align-items: center;
`;

const TopNavigationMainPage = () => {
    const Navigate = useNavigate();
    const location = useLocation();
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const Logout = () => {
        dispatch(Logout_Inistate_State_Func());
        localStorage.removeItem('Token');
        return Navigate('/');
    };

    const Login_Info_State = useSelector(state => state.Login_Info_Reducer_State.Login_Info);
    const [Nav_Select_Options_Menus, setNav_Select_Options_Menus] = useState([
        {
            value: '/Home',
            label: '홈(메인)',
            role: 'all',
        },
        {
            value: '/Man_day',
            label: 'Man_day',
            role: 'all',
        },
        {
            value: '/User_Manage',
            label: '사용자',
            role: 'user',
        },
    ]);
    const [Now_Select, setNow_Select] = useState({ value: location.pathname });
    const [open, setOpen] = useState(false);
    const Handle_Change_Move_To_Go = e => {
        Navigate(e.target.value);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const filteredNav = Nav_Select_Options_Menus.filter(navItem => {
        return navItem.role === 'all' || Login_Info_State?.user_access?.some(access => access.accessMenuCode === navItem.role);
    });
    return (
        <NavigationMainPageMainDivBox>
            <div className="NavigationMainFlexdiv">
                <div className="Main_Logo_Container">
                    <Link to="/Home">
                        <img src={`/${Login_Info_State.company}.png`} width="100px"></img>
                    </Link>
                    <div className="Main_Menu_Move_Container">
                        <FormControl sx={{ m: 1, minWidth: 100, margin: 0, width: '100%' }} size="small">
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={'/' + location.pathname.split('/')[1]}
                                onChange={event => Handle_Change_Move_To_Go(event)}
                            >
                                {filteredNav?.map(list => {
                                    return (
                                        <MenuItem value={list.value} key={list.value}>
                                            {list.label}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <MenuContainer ref={menuRef}>
                    <div className="Navigation_Icons" onClick={() => setOpen(!open)}>
                        <BsFillPersonFill></BsFillPersonFill>
                        {open && (
                            <DropdownMenu>
                                {/* <MenuItemss onClick={() => alert('구현 준비중에 있습니다.')}>
                                    <Icon>
                                        <FaKey size={16}></FaKey>
                                    </Icon>{' '}
                                    비밀번호 변경
                                </MenuItemss> */}
                                <MenuItemss
                                    onClick={() => {
                                        Logout();
                                    }}
                                >
                                    <Icon>
                                        <MdLogout size={16}></MdLogout>
                                    </Icon>{' '}
                                    로그아웃
                                </MenuItemss>
                            </DropdownMenu>
                        )}
                    </div>
                </MenuContainer>
            </div>
        </NavigationMainPageMainDivBox>
    );
};

export default TopNavigationMainPage;
