import { Request_Get_Axios } from "../../API";

export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});
export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const AllManDayItemfetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest()); // 요청 시작

    try {
      const response = await Request_Get_Axios(
        "/ManDayInfo/Getting_data_for_item"
      ); // Axios API 호출
      if (response.status)
        dispatch(fetchDataSuccess(response.data)); // 성공 시 데이터 저장
      else dispatch(fetchDataFailure("error"));
    } catch (error) {
      dispatch(fetchDataFailure(error.message)); // 실패 시 에러 저장
    }
  };
};

const initialState = {
  loading: false,
  Equipment_Lists_data: [],
  divide_Lists_data: [],
  error: null,
};

const ManDaySelectItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        Equipment_Lists_data: action.payload.Getting_Equipment_Lists,
        divide_Lists_data: action.payload.Getting_divide_Lists_SQL,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        Equipment_Lists_data: [],
        divide_Lists_data: [],
      };
    default:
      return state;
  }
};

export default ManDaySelectItemReducer;
