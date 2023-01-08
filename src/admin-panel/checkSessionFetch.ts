import { NavigateFunction } from "react-router-dom";

export const getSessionFetch =
  (navigate: NavigateFunction) =>
  async (resource: RequestInfo | URL, init?: RequestInit) => {
    const res = await fetch(resource, init);
    if (res.status === 401) {
      navigate("/signin");
    } else {
      const data = res.json();
      return data;
    }
  };
