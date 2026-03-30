import { Request_Get_Axios } from "../../../API";

export const HOLIDAY_FETCH_DATA_REQUEST = "HOLIDAY_FETCH_DATA_REQUEST";
export const HOLIDAY_FETCH_DATA_SUCCESS = "HOLIDAY_FETCH_DATA_SUCCESS";
export const HOLIDAY_FETCH_DATA_FAILURE = "HOLIDAY_FETCH_DATA_FAILURE";

export const HolidayfetchDataRequest = () => ({
  type: HOLIDAY_FETCH_DATA_REQUEST,
});
export const HolidayfetchDataSuccess = (data) => ({
  type: HOLIDAY_FETCH_DATA_SUCCESS,
  payload: data,
});
export const HolidayfetchDataFailure = (error) => ({
  type: HOLIDAY_FETCH_DATA_FAILURE,
  payload: error,
});

export const Holiday_Date_Lists_Fethcing = () => {
  return async (dispatch) => {
    dispatch(HolidayfetchDataRequest());

    try {
      const response = await Request_Get_Axios("/Home/Getting_Holiday_Lists");
      if (response.status) dispatch(HolidayfetchDataSuccess(response.data));
      else dispatch(HolidayfetchDataFailure("error"));
    } catch (error) {
      dispatch(HolidayfetchDataFailure(error.message));
    }
  };
};

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const HolidayThunkReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOLIDAY_FETCH_DATA_REQUEST:
      return { ...state, loading: true };
    case HOLIDAY_FETCH_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case HOLIDAY_FETCH_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default HolidayThunkReducer;
