import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Timetable } from "@api/models";

type CreateTimetableInput = {
  name: string;
  academicYear: string;
  semester: number;
};

const createTimetable = async (
  payload: CreateTimetableInput,
): Promise<Timetable> => {
  const response = await fetch("http://localhost:8080/timetable/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Failed to create timetable");
  return response.json();
};

export const useTimetableCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTimetable,
    onSuccess: (newTimetable: Timetable) => {
      queryClient.invalidateQueries({ queryKey: ["timetables-list"] });
      queryClient.invalidateQueries({ queryKey: ["timetable-details"] });
      queryClient.setQueryData(
        ["timetable-details", newTimetable.id],
        newTimetable,
      );
    },
  });
};
