import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Timetable } from "@api/models";

const updateTimetable = async (timetable: Timetable): Promise<Timetable> => {
  const response = await fetch(
    `http://localhost:8080/timetable/${timetable.id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timetable),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update timetable");
  }

  return response.json();
};

export const useTimetableUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTimetable,
    onSuccess: (updatedTimetable) => {
      queryClient.invalidateQueries({ queryKey: ["timetable-details"] });
      queryClient.setQueryData(
        ["timetable-details", updatedTimetable.id],
        updatedTimetable,
      );
    },
  });
};