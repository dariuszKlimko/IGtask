import { useState, useEffect } from "react";

function useFetch({ url, method, headers, data }) {
  const [response, setResponse] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const config = {
          method: method,
          headers: headers,
          body: data && JSON.stringify(data),
          signal: abortController.signal,
        };
        const result = await fetch(url, config);
        const resultJson = await result.json();
        setResponse(resultJson);
        setIsPending(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("request was cancelled");
        } else {
          console.log(error, "error");
          setError(error.message);
          setIsPending(false);
        }
      }
    };
    fetchData();
    return () => abortController.abort();
  }, []);

  return { response, isPending, error };
}

export default useFetch;
