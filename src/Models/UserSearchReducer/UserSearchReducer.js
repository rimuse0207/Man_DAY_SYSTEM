export const USER_SEARCH_REDUCER_GET = 'USER_SEARCH_REDUCER_GET';
export const CHANGE_USER_SEARCH_REDUCER_GET = 'CHANGE_USER_SEARCH_REDUCER_GET';

export const initState = {
    SearchInfo: null,
};

export const Change_User_Search_Reducer = data => ({
    type: CHANGE_USER_SEARCH_REDUCER_GET,
    payload: data,
});

const Change_User_Search_Reducer_State = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_USER_SEARCH_REDUCER_GET:
            return {
                ...state,
                SearchInfo: action.payload,
            };
        default:
            return state;
    }
};

export default Change_User_Search_Reducer_State;
