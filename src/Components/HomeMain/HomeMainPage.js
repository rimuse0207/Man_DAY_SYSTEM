import React, { useEffect } from 'react';
import styled from 'styled-components';
import NavigationMainPage from '../Navigation/NavigationMainPage';
import IconNavigationMainPage from '../Navigation/IconNavigation/IconNavigationMainPage';

import HomeContainer from './HomeContainer/HomeContainer';
import axios from 'axios';

const HomeMainPageMainDivBox = styled.div``;

const HomeMainPage = () => {
    return (
        <HomeMainPageMainDivBox>
            <NavigationMainPage></NavigationMainPage>
            <IconNavigationMainPage></IconNavigationMainPage>
            <HomeContainer></HomeContainer>
        </HomeMainPageMainDivBox>
    );
};
export default HomeMainPage;
