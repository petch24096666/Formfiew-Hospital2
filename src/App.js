import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CreatePatient from "./components/CreatePatient";
import UpdatePatient from "./components/UpdatePatient";
import DeletePatient from "./components/DeletePatient";
import PatientPage from "./components/Patientpage";
import ViewPatient from "./components/ViewPatient";
import ViewJson from './components/ViewJson';
import WelcomePage from "./components/WelcomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <main className="content bg-gray-100">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/patients" element={<PatientPage />} />
            <Route path="/create-patient" element={<CreatePatient />} />
            <Route path="/update-patient" element={<UpdatePatient />} />
            <Route path="/delete-patient" element={<DeletePatient />} />
            <Route path="/view-patient" element={<ViewPatient />} />
            <Route path="/view-json" element={<ViewJson />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;