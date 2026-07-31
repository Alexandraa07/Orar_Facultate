
import { useTimetablesQuery } from "@api/requests";
import { Box, Heading, List, ListItem, Spinner, Text } from "@chakra-ui/react";
import { Timetable } from "@api/models";

function App() {
  const { data, isLoading, isError } = useTimetablesQuery();

  return (
    <Box p={4}>
      <Heading mb={4}>Orarele mele</Heading>

      {isLoading && <Spinner />}
      {isError && <Text color="red">Eroare la încărcarea orarelor.</Text>}

      <List spacing={2}>
        {data?.map((timetable: Timetable) => (
          <ListItem key={timetable.id}>
            {timetable.name} — {timetable.academicYear}, semestrul {timetable.semester}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default App;