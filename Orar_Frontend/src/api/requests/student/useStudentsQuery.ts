import { useQuery } from "@tanstack/react-query";
import type { Student } from "@api/models";

const getStudents = async (): Promise<Student[]> => {
  const response = await fetch("http://localhost:8080/student/all");
  
  if (!response.ok) {
    throw new Error("Eroare la aducerea studenților de pe server");
  }
  
  return response.json();
};

export const useStudentsQuery = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });
};