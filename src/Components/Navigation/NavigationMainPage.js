import React, { useEffect } from 'react';
import TopNavigationMainPage from './TopNavigation/TopNavigationMainPage';
import { useDispatch } from 'react-redux';
import { Man_Day_Select_Option_fetchData } from '../../Models/ReduxThunks/ManDaySelectOptionReducer';

const NavigationMainPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Man_Day_Select_Option_fetchData());
    }, []);
    return (
        <div>
            <TopNavigationMainPage></TopNavigationMainPage>
        </div>
    );
};

export default NavigationMainPage;
