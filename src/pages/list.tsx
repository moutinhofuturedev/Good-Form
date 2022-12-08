import {
  Box,
  Text,
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Container,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { api } from '../api/api';

type ListProps = {
    name: string 
    email: string 
    password: string 
    profession: string 
}

export default function List() {
    const [user, setUser] = useState<ListProps>({
        name: '',
        email: '',
        password: '',
        profession: '',
    })
 
     async function loadList() {
       const response = await api.get('/form')
       const data = await response.data

       setUser({
        name: data[1].name,
        email: data[1].email,
        password: data[1].password,
        profession: data[1].profession,
    })
     }

     useEffect(() => {
        loadList()
     }, [])

    return(
        <Box h="100vh">
            <Head>
                <title>Form | Listagem</title>
            </Head>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Container mt="2rem">
                <Heading as="h2" size="lg">Registros</Heading>
                <Text fontSize="sm">Veja aqui a lista de pessoas cadastradas.</Text>
            </Container>
            <Divider py="1rem" maxW="560px"/>
            <Box border="1px" borderColor="gray.600" borderRadius="1rem" p="1rem" mt="2rem" maxW="680px">
                <TableContainer>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>Nome</Th>
                                <Th>E-mail</Th>
                                <Th>Profissão</Th>
                                <Th>Senha</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>{user.name}</Td>
                                <Td>{user.email}</Td>
                                <Td>{user.profession}</Td>
                                <Td>{user.password}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
                <Divider mt="2rem" />
            </Box>
            </Flex>
        </Box>
    ) 
}