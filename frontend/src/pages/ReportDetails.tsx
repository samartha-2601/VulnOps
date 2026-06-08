import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import Layout from "../components/Layout";

export default function ReportDetails() {
  const { id } = useParams();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await api.get(`/reports/${id}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    return (
      <Layout>
        <h2 className="text-xl">Loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl">
        <h1 className="text-5xl font-bold">
          {data.report.title}
        </h1>

        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-2 text-lg font-semibold text-slate-300">
            Severity
          </h2>

          <p className="text-2xl font-bold">
            {data.analysis.severity}
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-300">
            Root Cause
          </h2>

          <p className="text-slate-300">
            {data.analysis.root_cause}
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-300">
            Remediation
          </h2>

          <p className="text-slate-300">
            {data.analysis.remediation}
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-300">
            Report Description
          </h2>

          <p className="text-slate-300">
            {data.report.description}
          </p>
        </div>
      </div>
    </Layout>
  );
}