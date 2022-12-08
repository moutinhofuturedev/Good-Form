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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MdNavigateNext, MdError } from "react-icons/md";
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

       setTimeout(() => {
        setUser({
            name: data[0].name,
            email: data[0].email,
            password: data[0].password,
            profession: data[0].profession,
        })
       }, 3000)
     }

     useEffect(() => {
        loadList()
     }, [])

    return(
        <Box h="100vh">
            <Head>
                <title>Form | Listagem</title>
            </Head>
            <Breadcrumb fontWeight='medium' fontSize='sm' ml="1rem" mt="1rem" separator={<MdNavigateNext color='gray.500'/>}>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/dash'>Formulário</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage color="blue.400">
                    <BreadcrumbLink href='/list'>Listagem</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <Container mt="2rem">
                <Heading as="h2" size="lg">Registros</Heading>
                <Text fontSize="sm">Veja aqui a lista de pessoas cadastradas.</Text>
            </Container>
            <Divider py="1rem" maxW="560px"/>
                <Box border="1px" borderColor="gray.600" borderRadius="1rem" p="1rem" mt="2rem" maxW="620px">
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
                                    <Td>{!user.name ? <Icon as={MdError} w={5} h={5} /> : user.name}</Td>
                                    <Td>{!user.email ? <Icon as={MdError} w={5} h={5} /> : user.email}</Td>
                                    <Td>{!user.profession ? <Icon as={MdError} w={5} h={5} /> : user.profession}</Td>
                                    <Td>{!user.password ? <Icon as={MdError} w={5} h={5} /> : user.password}</Td>
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