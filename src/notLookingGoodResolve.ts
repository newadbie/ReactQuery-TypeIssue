import axios from "axios";
import { useQuery, UseQueryOptions } from "react-query";

interface IExampleData {
  example: string;
  example2: string;
}

type TParams = {
  currentPage: number;
  allPages: number;
};

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

export const useExampleData = (
  params: TParams,
  options?: Omit<UseQueryOptions<IExampleData, Error>, "queryKey" | "queryFn">
) => {
  return useQuery(
    ["/example", params],
    () => getExampleData("/example"),
    options
  );
};
