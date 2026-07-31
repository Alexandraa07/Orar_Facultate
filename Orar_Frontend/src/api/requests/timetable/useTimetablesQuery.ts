import { useQuery, useQueryClient } from "@tanstack/react-query";

const X = () => {
  console.log("1");
};

function Y() {
  console.log("2");
}

export const useTimetablesQuery = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["timetable"],
    queryFn: () =>
      // fetch-ul asta este fetch-ul din WEB API, Javascript pur, nicio bilioteca externa
      fetch("http://localhost:8080/timetable/all").then((res) => {
        queryClient.invalidateQueries({ queryKey: ["timetable-details"] });

        return res.json();
      }),
  });
};
