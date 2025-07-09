import React, { Children, useState } from 'react';
import { DepartmentMainPageMainDivBox } from '../Department/DepartmentMainPage';
import styled from 'styled-components';
import { CgLoadbar } from 'react-icons/cg';
import { FaPlus } from 'react-icons/fa6';
import AccessLists from './AccessLists/AccessLists';

const AccessMainPageMainDivBox = styled.div`
    .Full_Container {
        display: flex;

        .Left_Container {
            border-right: 1px solid lightgray;
            width: 250px;
            height: calc(100vh - 160px);
            ul {
                font-size: 0.9em;
                li {
                    .Menu_Container {
                        padding: 5px;
                        &:hover {
                            cursor: pointer;
                            background-color: #efefef;
                        }
                    }
                    .Icon_Container {
                        color: gray;
                        margin-right: 10px;
                    }
                }
            }
        }
        .Right_Container {
            width: calc(100% - 250px);
            height: calc(100vh - 160px);
            overflow: auto;
        }
    }
`;

const AccessMainPage = () => {
    const [Access_Menu_Lists, setAccess_Menu_Lists] = useState([
        {
            name: '메뉴 접속 권한',
            type: 'user',
            checked: true,
            children: [
                {
                    index: 1,
                    name: '사용자',
                    menu_select_code: 'user_user',
                    accessMenuCode: 'user',
                    accessType: 'user',
                },
            ],
        },
        {
            name: '관리자 권한',
            type: 'admin',
            checked: true,
            children: [
                {
                    index: 10,
                    name: 'Man-day',
                    menu_select_code: 'admin_man_day',
                    accessMenuCode: 'man_day',
                    accessType: 'admin',
                },
                {
                    index: 11,
                    name: '사용자',
                    menu_select_code: 'admin_user',
                    accessMenuCode: 'user',
                    accessType: 'admin',
                },
            ],
        },
    ]);
    const [Now_Select_Menu, setNow_Select_Menu] = useState(null);

    return (
        <DepartmentMainPageMainDivBox>
            <div style={{ borderBottom: '1px solid lightgray', paddingBottom: '10px' }}>
                <h2>권한 관리</h2>
                <div style={{ fontSize: '0.8em', marginTop: '10px', color: 'gray' }}>각 서비스 어드민의 관리자를 설정합니다.</div>
            </div>
            <AccessMainPageMainDivBox>
                <div className="Full_Container">
                    <div className="Left_Container">
                        <ul>
                            {Access_Menu_Lists.map((list, j) => {
                                return (
                                    <li style={{ marginBottom: `50px` }} key={list.name}>
                                        <div
                                            className="Menu_Container"
                                            onClick={e => {
                                                e.preventDefault();
                                                const Checeds = Access_Menu_Lists.map(pre =>
                                                    pre.name === list.name ? { ...pre, checked: !list.checked } : pre
                                                );
                                                setAccess_Menu_Lists(Checeds);
                                            }}
                                        >
                                            <span className="Icon_Container">{list.checked ? <CgLoadbar /> : <FaPlus />}</span>
                                            <span>{list.name}</span>
                                        </div>
                                        <div>
                                            <ul>
                                                {list.checked
                                                    ? list.children.map(item => {
                                                          return (
                                                              <div
                                                                  className="Menu_Container"
                                                                  style={
                                                                      item.menu_select_code === Now_Select_Menu?.menu_select_code
                                                                          ? { paddingLeft: '20px', color: 'blue', fontWeight: 'bolder' }
                                                                          : { paddingLeft: '20px' }
                                                                  }
                                                                  key={item.index}
                                                                  onClick={() => setNow_Select_Menu(item)}
                                                              >
                                                                  <span className="Icon_Container">
                                                                      <CgLoadbar />
                                                                  </span>
                                                                  <span>{item.name}</span>
                                                              </div>
                                                          );
                                                      })
                                                    : ''}
                                            </ul>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="Right_Container">
                        {Now_Select_Menu ? <AccessLists Now_Select_Menu={Now_Select_Menu}></AccessLists> : <></>}
                    </div>
                </div>
            </AccessMainPageMainDivBox>
        </DepartmentMainPageMainDivBox>
    );
};

export default AccessMainPage;
