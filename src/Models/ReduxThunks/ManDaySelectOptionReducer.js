import { Request_Get_Axios } from '../../API';

export const SELECT_OPTIONS_FETCH_DATA_REQUEST = 'SELECT_OPTIONS_FETCH_DATA_REQUEST';
export const SELECT_OPTIONS_FETCH_DATA_SUCCESS = 'SELECT_OPTIONS_FETCH_DATA_SUCCESS';
export const SELECT_OPTIONS_FETCH_DATA_FAILURE = 'SELECT_OPTIONS_FETCH_DATA_FAILURE';

export const Select_Options_fetchDataRequest = () => ({ type: SELECT_OPTIONS_FETCH_DATA_REQUEST });
export const Select_Options_fetchDataSuccess = data => ({ type: SELECT_OPTIONS_FETCH_DATA_SUCCESS, payload: data });
export const Select_Options_fetchDataFailure = error => ({ type: SELECT_OPTIONS_FETCH_DATA_FAILURE, payload: error });

export const Man_Day_Select_Option_fetchData = () => {
    return async dispatch => {
        dispatch(Select_Options_fetchDataRequest()); // 요청 시작

        try {
            const response = await Request_Get_Axios('/API/PLM/Getting_Option_Select_Lists'); // Axios API 호출

            if (response.status) dispatch(Select_Options_fetchDataSuccess(response.data)); // 성공 시 데이터 저장
            else dispatch(Select_Options_fetchDataFailure('error'));
        } catch (error) {
            dispatch(Select_Options_fetchDataFailure(error.message)); // 실패 시 에러 저장
        }
    };
};

const initialState = {
    loading: false,
    Depart_Option_Lists: [],
    Divide_Depart_Option_Lists: [],
    Sub_Depart_Option_Lists: [],
    error: null,
};

const ManDaySelectOptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_OPTIONS_FETCH_DATA_REQUEST:
            return { ...state, loading: true };
        case SELECT_OPTIONS_FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                Depart_Option_Lists: action.payload.Depart_Option_Lists,
                Sub_Depart_Option_Lists: action.payload.Sub_Depart_Option_Lists,
                Divide_Depart_Option_Lists: action.payload.Divide_Depart_Option_Lists,
            };
        case SELECT_OPTIONS_FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                Depart_Option_Lists: [],
                Sub_Depart_Option_Lists: [],
                Divide_Depart_Option_Lists: [],
            };
        default:
            return state;
    }
};

export default ManDaySelectOptionReducer;
