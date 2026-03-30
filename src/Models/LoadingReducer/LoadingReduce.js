export const LOADINGSTATEREDUCERGET = "LOADINGSTATEREDUCERGET";

const initState = {
  isLoading: false,
};

export const changeIsLoading = (data) => ({
  type: LOADINGSTATEREDUCERGET,
  payload: data,
});

const Loading_Reducer_State = (state = initState, action) => {
  switch (action.type) {
    case LOADINGSTATEREDUCERGET:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return initState;
  }
};

export default Loading_Reducer_State;
