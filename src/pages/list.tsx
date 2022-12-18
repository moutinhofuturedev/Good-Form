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
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MdNavigateNext, MdError, MdMoreHoriz } from "react-icons/md";
import { api } from '../api/api';
import { ListProps } from "../types/type";
import { useRouter } from "next/router";

export default function List() {
    const [user, setUser] = useState<ListProps[]>([]);
    const toast = useToast();
    const router = useRouter();

    const handleGoToUpdatePage = async (id: number) => {
        await router.push(`${id}/update`)
    }

    async function loadList() {
      try {
        const response = await api.get<ListProps[]>("/form");
        const data = response.data;

        setUser(data);
      } catch (error) {
        toast({
          title: "Não há dados",
          description: "Erro ao tentar buscar registros",
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
      }
    }

    useEffect(() => {
      loadList();
    }, []);

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
                <Box border="1px" borderColor="gray.600" borderRadius="1rem" p="1rem" mt="2rem" minW="620px">
                    <TableContainer>
                        <Table size='md'>
                            <Thead>
                                <Tr>
                                    <Th>Nome</Th>
                                    <Th>E-mail</Th>
                                    <Th>Profissão</Th>
                                    <Th>Data de criação</Th>
                                    <Th>Ações</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {user.map((row: ListProps, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{!row.name ? <Icon as={MdError}/> : row.name}</Td>
                                            <Td>{!row.email ? <Icon as={MdError}/> : row.email}</Td>
                                            <Td>{!row.profession ? <Icon as={MdError}/> : row.profession}</Td>
                                            <Td>{!row.createdAt ? <Icon as={MdError}/> : row.createdAt}</Td>
                                            <Td width="1px">
                                                <Menu>
                                                    <MenuButton 
                                                    border="1px solid"
                                                    borderRadius="9999" 
                                                    w="2.5rem"
                                                    h="2.5rem"
                                                    _active={{
                                                    transform: 'rotate(90deg)'}}
                                                     >
                                                        <Icon as={MdMoreHoriz} w={6} h={6}/>
                                                    </MenuButton>
                                                    <MenuList bg="gray.700" minWidth='140px'>
                                                        <MenuItem
                                                          bg="gray.700" 
                                                          _hover={{ bg: "gray.500"}}
                                                          onClick={() => handleGoToUpdatePage(row.id)}
                                                        >
                                                           Editar 
                                                        </MenuItem>
                                                        <MenuItem
                                                          bg="gray.700" 
                                                          _hover={{ bg: "gray.500"}}
                                                        >
                                                            Deletar
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Divider mt="2rem" />
                </Box>
            </Flex>
        </Box>
    ) 
}