import { Routes, Route, Navigate } from "react-router-dom";
import { TimetablePage, TimetablesPage, StudentsPage } from "./pages"; // 1. Am adăugat StudentsPage aici
import { ProfessorsPage } from "./pages/ProfessorsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/timetables" replace />} />
      <Route path="/timetables" element={<TimetablesPage />} />
      <Route path="/timetables/:id" element={<TimetablePage />} />
      <Route path="/professors" element={<ProfessorsPage />} />
            <Route path="/students" element={<StudentsPage />} />
    </Routes>
  );
}