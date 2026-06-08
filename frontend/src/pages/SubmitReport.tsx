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
  const [duplicate, setDuplicate] = useState<any>(null);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/reports",
        {
            title,
            description,
            steps,
            impact,
            asset,
        }
        );

        if (
        response.data.duplicate_found
        ) {
        setDuplicate(
            response.data.existing_report
        );

        return;
        }

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


        {
            duplicate && (
                <div
                className="
                mb-6
                rounded-xl
                border
                border-yellow-500
                bg-yellow-500/10
                p-6
                "
                >
                <h2
                    className="
                    text-xl
                    font-bold
                    text-yellow-400
                "
                >
                    Potential Duplicate Found
                </h2>

                <p className="mt-2">
                    {duplicate.metadata.title}
                </p>

                <p className="mt-2">
                    Severity:
                    {" "}
                    {duplicate.metadata.severity}
                </p>

                <p className="mt-2">
                    Similarity:
                    {" "}
                    {(
                    (1 -
                        duplicate.distance) *
                    100
                    ).toFixed(1)}
                    %
                </p>
                </div>
            )
            }

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