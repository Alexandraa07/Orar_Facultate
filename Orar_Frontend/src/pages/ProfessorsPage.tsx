import {
    Box,
    Heading,
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    HStack,
    Spinner,
    Text,
    Badge,
}

    from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProfessorsQuery } from "@api/requests/professor/useProfessorsQuery";
import type { Professor } from "@api/models";

export const ProfessorsPage = () => {
    const { data: professors, isLoading, isError, error } = useProfessorsQuery();

    return (
        <Box p={6} bg="gray.50" minH="100vh">
            {/* BARĂ NAVIGARE */}
            <Flex justifyContent="space-between" alignItems="center" mb={6} bg="white" p={4} borderRadius="md" shadow="sm">
                <Heading size="md" color="gray.700">
                    Portal Orar
                </Heading>

                <HStack spacing={3}>
                    <Button as={Link} to="/timetables" colorScheme="gray" size="sm">
                        Orare
                    </Button>
                    <Button as={Link} to="/students" colorScheme="gray" size="sm">
                        Studenți
                    </Button>
                    <Button as={Link} to="/professors" colorScheme="blue" size="sm">
                        Profesori
                    </Button>
                </HStack>
            </Flex>

            {/* TITLU */}
            <Heading size="lg" mb={4} color="gray.800">
                Lista Profesorilor
            </Heading>

            {isLoading && (
                <Flex justify="center" py={10}>
                    <Spinner size="xl" color="blue.500" />
                </Flex>
            )}

            {isError && (
                <Text color="red.500">
                    Eroare: {(error as Error).message}
                </Text>
            )}

            {/* TABELĂ PROFESORI */}
            {!isLoading && professors && (
                <Box bg="white" p={4} borderRadius="md" shadow="sm" overflowX="auto">
                    <Table variant="simple">
                        <Thead bg="gray.100">
                            <Tr>
                                <Th>ID</Th>
                                <Th>Nume Complet</Th>
                                <Th>Abreviere</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {professors.map((prof: Professor) => (
                                <Tr key={prof.id}>
                                    <Td fontWeight="bold">{prof.id}</Td>
                                    <Td>
                                        {prof.person.lastName} {prof.person.firstName}
                                    </Td>
                                    <Td>{prof.abbreviation || "—"}</Td>
                                    <Td>
                                        <Badge colorScheme="purple">{prof.status}</Badge>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            )}
        </Box>
    );
};