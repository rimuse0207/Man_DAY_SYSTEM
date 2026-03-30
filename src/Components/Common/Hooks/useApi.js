import { useState, useCallback } from "react";
import { Request_Get_Axios, Request_Post_Axios } from "../../../API";
import { useDispatch } from "react-redux";
import { changeIsLoading } from "../../../Models/LoadingReducer/LoadingReduce";

export const useApiExecute = (apiFunc) => {
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (path, sendingData, callbacks = {}) => {
      try {
        setIsLoading(true);
        const response = await apiFunc(path, sendingData);
        console.log(response);
        if (!response.status) {
          callbacks.onError?.(response.message);
          return;
        }
        callbacks.onSuccess?.(response.data);
      } catch (error) {
        console.error("API 실행 중 에러 발생:", error);
        callbacks.onError?.("서버와 통신 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
        callbacks.onFinally?.();
      }
    },
    [apiFunc],
  );

  return { execute, isLoading };
};

export const useApi = (apiConfig) => {
  const dispatch = useDispatch();
  const apiFunc =
    apiConfig.method === "GET" ? Request_Get_Axios : Request_Post_Axios;

  const { execute, isLoading } = useApiExecute(apiFunc);

  const request = useCallback(
    (payload, callbacks = {}) => {
      const { isGlobal = true } = callbacks;

      if (isGlobal) dispatch(changeIsLoading(true));

      execute(apiConfig.path, payload, {
        ...callbacks,
        onFinally: () => {
          dispatch(changeIsLoading(false));
          callbacks.onFinally?.();
        },
      });
    },
    [execute, apiConfig.path, dispatch],
  );

  return { request, isLoading };
};
