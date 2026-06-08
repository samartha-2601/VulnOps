import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import Layout from "../components/Layout";

export default function SubmitReport() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [impact, setImpact] = useState("");
  const [asset, setAsset] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await api.post("/reports", {
        title,
        description,
        steps,
        impact,
        asset,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">
          Submit Vulnerability Report
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Title
            </label>

            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Description
            </label>

            <textarea
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Steps To Reproduce
            </label>

            <textarea
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
              rows={4}
              value={steps}
              onChange={(e) =>
                setSteps(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Impact
            </label>

            <textarea
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
              rows={3}
              value={impact}
              onChange={(e) =>
                setImpact(e.target.value)
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Asset
            </label>

            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
              value={asset}
              onChange={(e) =>
                setAsset(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Submit Report
          </button>
        </form>
      </div>
    </Layout>
  );
}