import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useTimetablesQuery = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["timetable"],
    queryFn: () =>
      fetch("http://localhost:8080/timetable/all", {
        credentials: "include",
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Eroare la aducerea orarelor");
        }
        queryClient.invalidateQueries({ queryKey: ["timetable-details"] });

        return res.json();
      }),
  });
};