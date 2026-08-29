import { Routes, Route, Navigate } from "react-router-dom";
import {TimetablePage, TimetablesPage, StudentsPage} from "./pages";
import { ProfessorsPage } from "./pages/ProfessorsPage";
import {LoginPage} from "./pages/LoginPage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/timetables" element={<TimetablesPage />} />
      <Route path="/timetables/:id" element={<TimetablePage />} />
      <Route path="/professors" element={<ProfessorsPage />} />
      <Route path="/students" element={<StudentsPage />} />
    </Routes>
  );
}