import {
  Box,
  Heading,
  Flex,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Text,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGroupsQuery } from "@api/requests";
import { useActivitiesByGroupQuery } from "@api/requests"; // Hook-ul de activitati
import type { Group, Activity } from "@api/models";

export const TimetablesPage = () => {
  // Aducem grupele reale din baza de date
  const { data: groups, isLoading: isLoadingGroups } = useGroupsQuery();

  // Starea pentru grupa selectată
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");

  // Selectăm automat prima grupă primită de la backend
  useEffect(() => {
    if (groups && groups.length > 0 && !selectedGroupId) {
      setSelectedGroupId(groups[0].id.toString());
    }
  }, [groups, selectedGroupId]);

  // Aducem activitățile pentru grupa selectată
  const numericGroupId = selectedGroupId ? Number(selectedGroupId) : 0;
  const { data: activities, isLoading: isLoadingActivities } =
    useActivitiesByGroupQuery(numericGroupId);

  const selectedGroupObj = groups?.find((g) => g.id.toString() === selectedGroupId);

  const days = ["Luni", "Marți", "Miercuri", "Joi", "Vineri"];
  const hours = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
  ];

  // Helper pentru a potrivi activitatea pe ZI și ORĂ
  const getActivityForSlot = (dayName: string, hourSlot: string) => {
    if (!activities) return null;

    const startHour = hourSlot.split(" - ")[0]; // "08:00"

    return activities.find((act: Activity) => {
      const matchDay = act.day?.toLowerCase() === dayName.toLowerCase();
      const matchTime = act.startTime?.startsWith(startHour);
      return matchDay && matchTime;
    });
  };

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      {/* BARĂ NAVIGARE SUS */}
      <Flex justifyContent="space-between" alignItems="center" mb={6} bg="white" p={4} borderRadius="md" shadow="sm">
        <Heading size="md" color="gray.700">
          Portal Orar
        </Heading>

        <HStack spacing={3}>
          <Button as={Link} to="/timetables" colorScheme="blue" size="sm">
            Orare
          </Button>
          <Button as={Link} to="/students" colorScheme="gray" size="sm">
            Studenți
          </Button>
          <Button as={Link} to="/professors" colorScheme="gray" size="sm">
            Profesori
          </Button>
        </HStack>
      </Flex>

      {/* HEADER + DROPDOWN REAL CU GRUPE */}
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <HStack spacing={3}>
          <Heading size="lg" color="gray.800">
            Orar {selectedGroupObj ? `Grupa ${selectedGroupObj.groupName}` : "Se încarcă..."}
          </Heading>
          <Badge colorScheme="purple" p={1} borderRadius="md">
            Semestrul 1
          </Badge>
        </HStack>

        <HStack>
          <Text fontWeight="semibold" fontSize="sm">Alege grupa:</Text>
          {isLoadingGroups ? (
            <Spinner size="sm" color="blue.500" />
          ) : (
            <Select
              w="180px"
              bg="white"
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
            >
              {groups?.map((group: Group) => (
                <option key={group.id} value={group.id}>
                  Grupa {group.groupName}
                </option>
              ))}
            </Select>
          )}
        </HStack>
      </Flex>

      {/* TABELA PENTRU ORAR */}
      <Box bg="white" p={4} borderRadius="md" shadow="sm" overflowX="auto">
        {isLoadingActivities ? (
          <Flex justify="center" py={10}>
            <Spinner size="lg" color="blue.500" />
          </Flex>
        ) : (
          <Table variant="simple" size="md">
            <Thead bg="gray.100">
              <Tr>
                <Th w="150px">Ora / Ziua</Th>
                {days.map((day) => (
                  <Th key={day} textAlign="center">
                    {day}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {hours.map((hour) => (
                <Tr key={hour}>
                  <Td fontWeight="bold" color="gray.600" fontSize="xs">
                    {hour}
                  </Td>
                  {days.map((day) => {
                    const activity = getActivityForSlot(day, hour);

                    return (
                      <Td key={day} textAlign="center" p={2} border="1px solid" borderColor="gray.100">
                        {activity ? (
                          <Box
                            bg="blue.50"
                            p={2}
                            borderRadius="md"
                            borderLeft="4px solid"
                            borderColor="blue.500"
                          >
                            <Text fontWeight="bold" fontSize="xs" color="gray.800">
                              {activity.course?.name || activity.course?.abbreviation || "Curs/Laborator"}
                            </Text>
                            <Text fontSize="10px" color="gray.600">
                              {activity.activityType} • Sala {activity.room?.name || "—"}
                            </Text>
                            {activity.professor?.person && (
                              <Text fontSize="10px" color="gray.500">
                                {activity.professor.person.lastName} {activity.professor.person.firstName}
                              </Text>
                            )}
                          </Box>
                        ) : (
                          <Text color="gray.300" fontSize="xs">—</Text>
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
};