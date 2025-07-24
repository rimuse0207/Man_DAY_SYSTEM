import React from 'react';
import styled from 'styled-components';
import LicenseContainer from './CardList/License/LicenseContainer';

const HomeCardMainContainerMainDiv = styled.div`
    padding-right: 20px;
    border-top: 1px solid lightgray;
`;

const HomeCardMainContainer = () => {
    return (
        <HomeCardMainContainerMainDiv>
            <h3 style={{ textAlign: 'center' }}>금주 Man_day 현황</h3>
            <LicenseContainer></LicenseContainer>
        </HomeCardMainContainerMainDiv>
    );
};

export default HomeCardMainContainer;
