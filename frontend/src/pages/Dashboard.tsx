import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

interface Report {
  id: number;
  title: string;
  description: string;
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
    <div style={{ padding: "20px" }}>
      <h1>VulnOps Dashboard</h1>


      <Link
            to="/submit"
            style={{
                display: "inline-block",
                marginBottom: "20px",
            }}
            >
            Submit New Report
        </Link>

      {reports.map((report) => (
        <Link
            key={report.id}
            to={`/reports/${report.id}`}
            style={{
                textDecoration: "none",
                color: "inherit",
            }}
            >
            <div
                style={{
                border: "1px solid gray",
                marginTop: "10px",
                padding: "10px",
                }}
            >
                <h3>{report.title}</h3>
                <p>{report.description}</p>
            </div>
            </Link>
      ))}
    </div>
  );
}