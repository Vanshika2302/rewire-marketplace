import { useEffect, useState, useCallback } from "react";

// Runs an async function and tracks loading, error and data.
// `fn` receives an AbortSignal so requests are cancelled on unmount.
export default function useAsync(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const [tick, setTick] = useState(0);
  const retry = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: "" }));
    fn(controller.signal)
      .then((data) => setState({ data, loading: false, error: "" }))
      .catch((e) => {
        if (e.name !== "AbortError") setState({ data: null, loading: false, error: e.message });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  return { ...state, retry };
}
