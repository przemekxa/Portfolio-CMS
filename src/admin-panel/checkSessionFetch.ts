import { NavigateFunction } from "react-router-dom";

export const getSessionFetch =
  (navigate: NavigateFunction) =>
  async (resource: RequestInfo | URL, init?: RequestInit) => {
    const res = await fetch(resource, init);
    if (res.ok) {
      const contentType = res.headers.get("content-type")
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return await res.json();
      }
    } else if (res.status === 401) {
      navigate("/signin");
    } else {
      throw new Error(res.statusText);
    }
  };
