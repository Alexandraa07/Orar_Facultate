import { useQuery } from "@tanstack/react-query";
import type { Professor } from "@api/models";

const getProfessors = async (): Promise<Professor[]> => {
  const response = await fetch("http://localhost:8080/professor/all", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Eroare la încărcarea profesorilor!");
  }

  return response.json();
};

export const useProfessorsQuery = () => {
  return useQuery({
    queryKey: ["professors"],
    queryFn: getProfessors,
  });
};