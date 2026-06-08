import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ReportDetails from "./pages/ReportDetails";
import SubmitReport from "./pages/SubmitReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/reports/:id"
          element={<ReportDetails />}
        />

        <Route
          path="/submit"
          element={<SubmitReport />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;