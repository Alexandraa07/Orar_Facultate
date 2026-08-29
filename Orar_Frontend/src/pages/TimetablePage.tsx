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
    Select,
    Spinner,
    Text,
    Badge,
    VStack
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useActivitiesByGroupQuery } from "@api/requests/activity/useActivitiesQuery";
import { useGroupsQuery } from "@api/requests/group/useGroupsQuery";
import type { Activity, Group } from "@api/models";

const DAYS = ["Luni", "Marți", "Miercuri", "Joi", "Vineri"];

const TIME_SLOTS = [
    { label: "08:00 - 10:00", hour: "08" },
    { label: "10:00 - 12:00", hour: "10" },
    { label: "12:00 - 14:00", hour: "12" },
    { label: "14:00 - 16:00", hour: "14" },
    { label: "16:00 - 18:00", hour: "16" },
    { label: "18:00 - 20:00", hour: "18" },
];

const normalizeDay = (day?: string) => {
    if (!day) return "";
    return day.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
};

const getActivityBadge = (type?: string) => {
    const t = String(type || "").toLowerCase();
    if (t === "lecture" || t === "course") return { label: "CURS", color: "blue" };
    if (t === "laboratory" || t === "lab") return { label: "LABORATOR", color: "orange" };
    if (t === "seminar") return { label: "SEMINAR", color: "green" };
    return { label: t.toUpperCase() || "ACTIVITATE", color: "purple" };
};

export const TimetablePage = () => {
    const [selectedGroupId, setSelectedGroupId] = useState<number>(1);

    const { data: groups } = useGroupsQuery();
    const { data: activities, isLoading, isError, error } = useActivitiesByGroupQuery(selectedGroupId);

    useEffect(() => {
        if (groups && groups.length > 0 && !groups.some((g: Group) => g.id === selectedGroupId)) {
            if (groups[0].id) setSelectedGroupId(groups[0].id);
        }
    }, [groups, selectedGroupId]);

    const getActivityForSlot = (day: string, slotHour: string) => {
        return activities?.find((act: Activity) => {
            const matchesDay = normalizeDay(act.day) === normalizeDay(day);

            let actHour = "";
            if (Array.isArray(act.startTime)) {
                actHour = String(act.startTime[0]).padStart(2, "0");
            } else if (act.startTime) {
                actHour = String(act.startTime).split(":")[0].padStart(2, "0");
            }

            return matchesDay && actHour === slotHour;
        });
    };

    const currentGroup = groups?.find((g: Group) => g.id === selectedGroupId);

    return (
        <Box p={6} bg="gray.50" minH="100vh">
            <Flex justifyContent="space-between" alignItems="center" mb={6} bg="white" p={4} borderRadius="md" shadow="sm">
                <Heading size="md" color="gray.700">Portal Orar</Heading>
                <HStack spacing={3}>
                    <Button as={Link} to="/timetables" colorScheme="blue" size="sm">Orare</Button>
                    <Button as={Link} to="/students" colorScheme="gray" size="sm">Studenți</Button>
                    <Button as={Link} to="/professors" colorScheme="gray" size="sm">Profesori</Button>
                </HStack>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center" mb={6}>
                <HStack spacing={3}>
                    <Heading size="lg">
                        Orar Grupa {(currentGroup as any)?.groupName || (currentGroup as any)?.name || selectedGroupId}
                    </Heading>
                    <Badge colorScheme="purple" fontSize="0.8em" p={1} borderRadius="md">SEMESTRUL 1</Badge>
                </HStack>

                <HStack>
                    <Text fontWeight="bold">Alege grupa:</Text>
                    <Select 
                        w="220px" 
                        bg="white" 
                        value={selectedGroupId} 
                        onChange={(e) => setSelectedGroupId(Number(e.target.value))}
                    >
                        {groups?.map((g: Group) => (
                            <option key={g.id} value={g.id}>
                                Grupa {(g as any).groupName || (g as any).name || g.id}
                            </option>
                        ))}
                    </Select>
                </HStack>
            </Flex>

            {isLoading ? (
                <Flex justify="center" py={10}><Spinner size="xl" color="blue.500" /></Flex>
            ) : isError ? (
                <Text color="red.500">Eroare: {(error as Error)?.message || "Eroare la încărcarea datelor!"}</Text>
            ) : (
                <Box bg="white" p={4} borderRadius="md" shadow="sm" overflowX="auto">
                    <Table variant="simple" colorScheme="teal">
                        <Thead>
                            <Tr>
                                <Th>ORA / ZIUA</Th>
                                {DAYS.map((day) => (
                                    <Th key={day} textAlign="center">{day.toUpperCase()}</Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {TIME_SLOTS.map((slot) => (
                                <Tr key={slot.label}>
                                    <Td fontWeight="bold" color="gray.600" whiteSpace="nowrap">
                                        {slot.label}
                                    </Td>
                                    {DAYS.map((day) => {
                                        const activity = getActivityForSlot(day, slot.hour);
                                        const badge = getActivityBadge(activity?.activityType);
                                        const subject = activity?.course?.name || "Curs";
                                        const room = activity?.room?.name;

                                        return (
                                            <Td key={day} textAlign="center" p={2} h="90px">
                                                {activity ? (
                                                    <VStack spacing={1} p={2} bg="blue.50" borderRadius="md" borderLeft="4px solid" borderColor={`${badge.color}.500`}>
                                                        <Text fontWeight="bold" fontSize="xs" color="blue.900" noOfLines={2}>
                                                            {subject}
                                                        </Text>
                                                        <Badge colorScheme={badge.color} fontSize="xs">
                                                            {badge.label}
                                                        </Badge>
                                                        {room && (
                                                            <Text fontSize="xs" color="gray.600">
                                                                Sala: {room}
                                                            </Text>
                                                        )}
                                                    </VStack>
                                                ) : (
                                                    <Text color="gray.300">—</Text>
                                                )}
                                            </Td>
                                        );
                                    })}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            )}
        </Box>
    );
};