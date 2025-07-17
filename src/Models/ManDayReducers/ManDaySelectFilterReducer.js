export const MAN_DAY_SELCET_FILTER_STATE_REDUCER_GET = 'MAN_DAY_SELCET_FILTER_STATE_REDUCER_GET';
export const MAN_DAY_SELCET_FILTER_INITIAL_STATE_REDUCER_GET = 'MAN_DAY_SELCET_FILTER_INITIAL_STATE_REDUCER_GET';

export const initState = {
    Filters_State: {
        period: {
            start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            end: new Date(),
        },
        depart: null,
        sub_depart: null,
        divide: null,
        name: null,
        team: null,
        inputCheck: null,
        company: null,
    },
};

export const Insert_Man_Day_Select_Reducer_State_Func = data => ({
    type: MAN_DAY_SELCET_FILTER_STATE_REDUCER_GET,
    payload: data,
});
export const Initial_Man_Day_Select_Reducer_State_Func = () => ({
    type: MAN_DAY_SELCET_FILTER_INITIAL_STATE_REDUCER_GET,
});

const Man_Day_Select_Filter_Reducer_State = (state = initState, action) => {
    switch (action.type) {
        case MAN_DAY_SELCET_FILTER_STATE_REDUCER_GET:
            return {
                ...state,
                Filters_State: action.payload,
            };
        case MAN_DAY_SELCET_FILTER_INITIAL_STATE_REDUCER_GET:
            return initState;
        default:
            return state;
    }
};

export default Man_Day_Select_Filter_Reducer_State;
