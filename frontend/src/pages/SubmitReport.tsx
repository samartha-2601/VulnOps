import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

export default function SubmitReport() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [impact, setImpact] = useState("");
  const [asset, setAsset] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.post("/reports", {
      title,
      description,
      steps,
      impact,
      asset,
    });

    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Submit Vulnerability Report</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <br />

        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <br />

        <div>
          <textarea
            placeholder="Steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />
        </div>

        <br />

        <div>
          <textarea
            placeholder="Impact"
            value={impact}
            onChange={(e) => setImpact(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            placeholder="Asset"
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Submit Report
        </button>
      </form>
    </div>
  );
}