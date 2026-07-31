import { useStudentsQuery } from "@api/requests";
import type { Student } from "@api/models";
import { Link } from "react-router-dom";

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
export const StudentsPage = () => {
    const { data: students, isLoading, isError } = useStudentsQuery();

    if (isLoading) return <Spinner size="xl" mt={10} ml={10} />;
    if (isError) return <Text color="red.500" p={4}>Eroare la încărcarea datelor!</Text>;

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
                    <Button as={Link} to="/students" colorScheme="blue" size="sm">
                        Studenți
                    </Button>
                    <Button as={Link} to="/professors" colorScheme="gray" size="sm">
                        Profesori
                    </Button>
                </HStack>
            </Flex>

            <Heading mb={6}>Lista Studenților</Heading>

            <Table variant="simple" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Nume Complet</Th>
                        <Th>Nr. Matricol</Th>
                        <Th>Grupă</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {students?.map((student: Student) => (
                        <Tr key={student.id}>
                            <Td>{student.id}</Td>
                            <Td>
                                {student.person?.lastName} {student.person?.fatherInitial} {student.person?.firstName}
                            </Td>
                            <Td>
                                <Badge colorScheme="purple">{student.studentNumber}</Badge>
                            </Td>
                            <Td>{student.group?.id ? `Grupa ${student.group.id}` : "Fără grupă"}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};