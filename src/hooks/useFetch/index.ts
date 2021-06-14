import React from "react";
import ReactDOM from "react-dom";

interface useFetchArguments<T extends any> {
  url: string;
  condition?: boolean;
  onMount?: boolean;
  params?: any;
  prepareResponse?: (response: T) => T;
}

// TODO: Add posibility to invoke fetch method outside passing id of particular entity
// and the same time using onMount with *false* value.
export const useFetch = <T extends any>({
  url,
  params,
  condition = true,
  onMount = true,
  prepareResponse,
}: useFetchArguments<T>): [T | undefined, Boolean, () => Promise<void>] => {
  const [data, setData] = React.useState<T | undefined>(undefined);
  const [loading, setLoading] = React.useState(condition ? true : false);

  const fetchSmth = React.useCallback(async () => {
    try {
      const response = await (await fetch(url, params)).json();

      // I have to use that here because of re-renders appearing under the async code.
      // React usually batches setState functions outside async code.
      ReactDOM.unstable_batchedUpdates(() => {
        setLoading(false);

        if (prepareResponse) setData(prepareResponse(response));
        setData(response);
      });
    } catch (error) {
      setLoading(false);

      console.warn(error);
    }
  }, [condition]);

  React.useEffect(() => {
    if (condition && onMount) fetchSmth();
  }, [condition]);

  return [data, loading, fetchSmth];
};
