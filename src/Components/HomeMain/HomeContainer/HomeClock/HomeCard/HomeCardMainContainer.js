import React from 'react';
import styled from 'styled-components';
import LicenseContainer from './CardList/License/LicenseContainer';

const HomeCardMainContainerMainDiv = styled.div`
    padding-right: 20px;
`;

const HomeCardMainContainer = () => {
    return (
        <HomeCardMainContainerMainDiv>
            <h3>이수증</h3>
            <LicenseContainer></LicenseContainer>
        </HomeCardMainContainerMainDiv>
    );
};

export default HomeCardMainContainer;
