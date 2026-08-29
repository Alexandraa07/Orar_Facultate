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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProfessorsQuery } from "@api/requests/professor/useProfessorsQuery";
import type { Professor } from "@api/models";

export const ProfessorsPage = () => {
    const { data: professors, isLoading, isError, error } = useProfessorsQuery();

    if (isLoading) return <Spinner size="xl" mt={10} ml={10} />;
    if (isError) return <Text color="red.500" p={4}>Eroare: {(error as Error).message}</Text>;

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
            <Heading mb={6}>Lista Profesorilor</Heading>

            {/* TABELĂ PROFESORI */}
            <Table variant="simple" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Nume Complet</Th>
                        <Th>Abreviere</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {professors?.map((prof: Professor) => (
                        <Tr key={prof.id}>
                            <Td>{prof.id}</Td>
                            <Td>
                                {prof.person?.lastName} {prof.person?.firstName}
                            </Td>
                            <Td>
                                <Badge colorScheme="purple">
                                    {prof.abbreviation || "—"}
                                </Badge>
                            </Td>
                            <Td>{prof.status || "—"}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};