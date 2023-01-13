/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Text,
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
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
  Button,
  Center,
  Tooltip,
} from "@chakra-ui/react";
import { BsInfoCircle } from "react-icons/bs"
import Head from "next/head";
import { useEffect, useState } from "react";
import { MdNavigateNext, MdMoreHoriz, MdDeleteOutline, MdUpdate } from "react-icons/md";
import { api } from '../api/api';
import { ListProps } from "../types/type";
import { useRouter } from "next/router";

export default function List() {
    const [user, setUser] = useState<ListProps[]>([]);
    const toast = useToast();
    const router = useRouter();

    const handleGoToUpdatePage = async (id: number) => {
        await router.push(`update/${id}`)
    }

    const handleDeleteData = async (id: number) => {
       try {
        await api.delete(`form/${id}`)

        router.push('/')
        toast({
            title: "Registro removido",
            status: "success",
            duration: 6000,
            position: "top-left",
            isClosable: true
        })
       } catch (error) {
        toast({
          title: "Error",
          description: "Erro ao tentar remover registro.",
          status: "error",
          duration: 6000,
          position: "top-left",
          isClosable: true
        })
       }
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
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      }
    }

    useEffect(() => {
      loadList();
    }, []);


    return (
      <Box h="100vh">
        <Head>
          <title>Form | Listagem</title>
        </Head>
        <Breadcrumb
          fontWeight="medium"
          fontSize="sm"
          ml="1rem"
          mt="1rem"
          separator={<MdNavigateNext color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/dash">Formulário</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage color="blue.400">
            <BreadcrumbLink href="/list">Listagem</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Flex justifyContent="center" alignItems="center">
            <Container mt="2rem">
              <Heading as="h2" size="lg">
                Registros
              </Heading>
              <Text fontSize="sm">
                Veja aqui a lista de pessoas registradas.
              </Text>
            </Container>
            <Button
              mt="2rem"
              colorScheme="blue"
              width="17.5rem"
              onClick={() => router.push("/dash")}
            >
              Novo Registro
            </Button>
          </Flex>
          <Divider py="1rem" maxW="560px" />
          <Box
            border="1px"
            borderColor="gray.600"
            borderRadius="1rem"
            p="1rem"
            mt="2rem"
            minW="620px"
          >
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    {[
                      "Nome",
                      "E-mail",
                      "Profissão",
                      "Data de Criação",
                      "Data de Alteração",
                      "Ações",
                    ].map((item, index) => {
                      return (
                        <Td key={index} color="gray.500" fontWeight="medium">
                          {item.toUpperCase()}
                        </Td>
                      );
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {user.map((row: ListProps, index) => {
                    return (
                      <Tr key={index}>
                        <Td
                          maxW="200px"
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          title={row.name}
                        >{`${index + 1}⍛ ${row.name}`}</Td>
                        <Td
                          maxW="200px"
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          title={row.email}
                        >
                          {row.email}
                        </Td>
                        <Td>{row.profession}</Td>
                        <Td>{row.createdAt}</Td>
                        <Td>
                          {!row.updatedAt ? (
                            <Center>
                             <Icon as={BsInfoCircle} fontSize={20} title="Não há alterações"/>
                            </Center>
                          ) : (
                            row.updatedAt
                          )}
                        </Td>
                        <Td width="1px">
                          <Menu>
                            <MenuButton
                              border="1px solid"
                              borderRadius="9999"
                              w="2.5rem"
                              h="2.5rem"
                              _active={{
                                transform: "rotate(90deg)",
                              }}
                            >
                              <Icon as={MdMoreHoriz} w={6} h={6} />
                            </MenuButton>
                            <MenuList bg="gray.700" minWidth="140px">
                              <MenuItem
                                bg="gray.700"
                                _hover={{ bg: "gray.500" }}
                                onClick={() => handleGoToUpdatePage(row.id)}
                                icon={<MdUpdate size={20} />}
                                fontWeight="bold"
                                fontSize="md"
                              >
                                Editar
                              </MenuItem>
                              <MenuItem
                                bg="gray.700"
                                _hover={{ bg: "gray.500" }}
                                onClick={() => handleDeleteData(row.id)}
                                icon={<MdDeleteOutline size={20} />}
                                fontWeight="bold"
                                fontSize="md"
                              >
                                Deletar
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Divider mt="2rem" />
          </Box>
        </Flex>
      </Box>
    ); 
}