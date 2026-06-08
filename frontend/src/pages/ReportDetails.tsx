import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

export default function ReportDetails() {
  const { id } = useParams();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    const response = await api.get(`/reports/${id}`);
    setData(response.data);
  };

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{data.report.title}</h1>

      <h2>Severity</h2>
      <p>{data.analysis.severity}</p>

      <h2>Root Cause</h2>
      <p>{data.analysis.root_cause}</p>

      <h2>Remediation</h2>
      <p>{data.analysis.remediation}</p>
    </div>
  );
}