import { useQuery } from "@tanstack/react-query";
import { Timetable } from "@api/models";

const getTimetableDetails = async (id: number): Promise<Timetable> => {
  const response = await fetch(`http://localhost:8080/timetable/${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch timetable details");
  }

  return response.json();
};

export const useTimetableDetailsQuery = (id: number) => {
  return useQuery({
    queryKey: ["timetable-details", id],
    queryFn: () => getTimetableDetails(id),
    enabled: !Number.isNaN(id),
  });
};