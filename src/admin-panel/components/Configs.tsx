import React from "react";
import { SWRConfig } from "swr";
import { useNavigate } from "react-router-dom";
import { getSessionFetch } from "../checkSessionFetch";

const Configs: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const swr = { fetcher: getSessionFetch(navigate) };

  return <SWRConfig value={swr}>{children}</SWRConfig>;
};

export default Configs;
