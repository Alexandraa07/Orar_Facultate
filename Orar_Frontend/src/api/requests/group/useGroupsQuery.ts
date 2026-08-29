import { useQuery } from "@tanstack/react-query";
import type { Group } from "@api/models";

const getGroups = async (): Promise<Group[]> => {
  const response = await fetch("http://localhost:8080/group/all", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Eroare la aducerea grupelor de pe server!");
  }

  return response.json();
};

export const useGroupsQuery = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });
};