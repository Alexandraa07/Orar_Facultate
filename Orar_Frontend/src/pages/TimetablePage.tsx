import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  HStack,
  Badge,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { useTimetableDetailsQuery } from "@api/requests/timetable/useTimetableDetailsQuery";

export const TimetablePage = () => {
  const { id } = useParams();
  const numericId = id ? Number(id) : NaN;
  const { data, isFetching, isError, error } = useTimetableDetailsQuery(numericId);

  const days = ["Luni", "Marți", "Miercuri", "Joi", "Vineri"];
  const hours = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
  ];

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      {/* 1. BARĂ NAVIGARE SUS */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={6}
        bg="white"
        p={4}
        borderRadius="md"
        shadow="sm"
      >
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
        </HStack>
      </Flex>

      {/* 2. STĂRI DE LOADING SAU EROARE */}
      {isFetching && (
        <Flex justify="center" align="center" py={10}>
          <Spinner size="xl" color="blue.500" mr={4} />
          <Text fontWeight="semibold">Se încarcă detaliile orarului #{id}...</Text>
        </Flex>
      )}

      {isError && (
        <Box bg="red.50" p={4} borderRadius="md" borderLeft="4px solid" borderColor="red.500" mb={6}>
          <Text color="red.700" fontWeight="bold">
            Eroare la încărcarea orarului: {(error as Error).message}
          </Text>
        </Box>
      )}

      {/* 3. CONȚINUTUL ORARULUI */}
      {!isFetching && data && (
        <Box>
          {/* HEADER ORAR */}
          <Flex justifyContent="space-between" alignItems="center" mb={6} bg="white" p={4} borderRadius="md" shadow="sm">
            <Box>
              <HStack spacing={3} mb={1}>
                <Heading size="lg" color="gray.800">
                  {data.name}
                </Heading>
                <Badge colorScheme="purple" p={1} borderRadius="md">
                  Semestrul {data.semester}
                </Badge>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                An Universitar: {data.academicYear} • ID Orar: #{data.id}
              </Text>
            </Box>

            <Button as={Link} to="/timetables" variant="outline" size="sm">
              ← Înapoi la orare
            </Button>
          </Flex>

          {/* TABELA PENTRU ACTIVITĂȚILE DIN ORAR */}
          <Box bg="white" p={4} borderRadius="md" shadow="sm" overflowX="auto">
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
                    {days.map((day) => (
                      <Td key={day} textAlign="center" p={2} border="1px solid" borderColor="gray.100">
                        {/* Aici vor fi afișate activitățile orarului când le legăm din `data` */}
                        <Text color="gray.300" fontSize="xs">—</Text>
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      )}
    </Box>
  );
};