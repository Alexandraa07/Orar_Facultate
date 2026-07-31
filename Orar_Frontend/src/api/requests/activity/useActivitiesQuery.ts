import { useQuery } from "@tanstack/react-query";
import type { Activity } from "@api/models";

const getActivitiesByGroup = async (groupId: number): Promise<Activity[]> => {
  if (!groupId) return [];
  const response = await fetch(`http://localhost:8080/activity/group/${groupId}`);

  if (!response.ok) {
    throw new Error("Eroare la aducerea activităților!");
  }

  return response.json();
};

export const useActivitiesByGroupQuery = (groupId: number) => {
  return useQuery({
    queryKey: ["activities", groupId],
    queryFn: () => getActivitiesByGroup(groupId),
    enabled: !!groupId,
  });
};