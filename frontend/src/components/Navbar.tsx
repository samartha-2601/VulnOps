import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-white"
          >
            VulnOps
          </Link>

          <div className="flex gap-6">
            <Link
              to="/"
              className="text-slate-300 hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              to="/submit"
              className="text-slate-300 hover:text-white"
            >
              Submit Report
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}