import type { Person } from "../student/Student"; // Sau calea exactă unde ai definit Person (ex: "../person/Person")

export type ProfessorStatus =
  | "professor"
  | "associate_professor"
  | "lecturer"
  | "phd_assistant";

export interface Professor {
  id: number;
  status: ProfessorStatus;
  abbreviation?: string;
  person: Person;
}