import axios from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

interface IExampleData {
  example: string;
  example2: string;
}

type TParams = {
  currentPage: number;
  allPages: number;
};

interface IQueryParams {
  params: TParams;
}

export type TReactQuery<T, P = null> = null extends P
  ? (
      options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
    ) => UseQueryResult<T, Error>
  : (
      params: P,
      options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">
    ) => UseQueryResult<T, Error>;

const getExampleData = async (url: string) => {
  try {
    const payload = await axios.get<IExampleData>(
      "https://example.com/get-example-data"
    );
    return payload.data;
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : "Undefined error");
  }
};

export const useExampleData: TReactQuery<IExampleData, IQueryParams> = (
  { params },
  options
) => {
  return useQuery(
    ["/example", params],
    () => getExampleData("/example"),
    options
  );
};
