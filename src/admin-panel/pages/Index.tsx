import React from "react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { getSessionFetch } from "../checkSessionFetch";
import DashboardLayout from "../components/DashboardLayout";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const _session_logout_test = useSWR("/api/footer", getSessionFetch(navigate));

  return <DashboardLayout>index a</DashboardLayout>;
};

export default Index;
