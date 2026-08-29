import { Box, Button, Center, Input, Heading, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (res.ok) {
      navigate("/timetables");
    } else {
      toast({ title: "Username sau parolă greșită", status: "error", duration: 2000 });
    }
  };

  return (
    <Center h="100vh" bg="gray.50">
      <Box as="form" onSubmit={handleLogin} p={8} bg="white" rounded="lg" shadow="md" w="320px">
        <VStack spacing={4}>
          <Heading size="md" mb={2} color="gray.700">Autentificare</Heading>
          
          <Input 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          
          <Input 
            type="password" 
            placeholder="Parolă" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          <Button type="submit" colorScheme="blue" w="full" mt={2}>
            Login
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};