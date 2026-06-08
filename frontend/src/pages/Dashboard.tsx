import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

import Layout from "../components/Layout";
import StatsCard from "../components/StatsCard";
import SeverityBadge from "../components/SeverityBadge";

interface Report {
  id: number;
  title: string;
  description: string;
  severity: string
}

export default function Dashboard() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await api.get("/reports");
      setReports(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">
            Vulnerability Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            AI-powered bug bounty triage platform
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Total Reports"
            value={reports.length}
          />

          <StatsCard
            title="Critical Findings"
            value={
                reports.filter((r) => r.severity === "Critical").length
            }
          />

          <StatsCard
            title="High Severity"
            value={
                reports.filter((r) => r.severity === "High").length
            }
          />
        </div>

        

        <div className="flex justify-end">
            
          <Link
            to="/submit"
            className="
              rounded-lg
              bg-blue-600
              px-4
              py-2
              font-medium
              text-white
              hover:bg-blue-700
            "
          >
            Submit Report
          </Link>
          
        </div>

        

        <div className="space-y-4">
          {reports.map((report) => (
            <Link
              key={report.id}
              to={`/reports/${report.id}`}
            >
              <div
                className="
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900
                  p-6
                  transition
                  hover:border-blue-500
                  hover:bg-slate-800
                "
              >
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        {report.title}
                    </h2>

                    <SeverityBadge
                        severity={report.severity}
                    />
                </div>

                <p className="mt-2 text-slate-400">
                  {report.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}