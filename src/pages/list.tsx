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
  Spinner,
  Input,
  TableCaption,
} from "@chakra-ui/react";
import { BsInfoCircle } from "react-icons/bs"
import Head from "next/head";
import { useEffect, useState } from "react";
import { MdNavigateNext, MdMoreHoriz, MdDeleteOutline, MdUpdate } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { api } from '../api/api';
import { ListProps } from "../types/type";
import { useRouter } from "next/router";
import useDebounce from "../hooks/debounce";

export default function List() {
    const [ user, setUser ] = useState<ListProps[]>([]);
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const toast = useToast();
    const router = useRouter();

    const debounce = useDebounce(searchTerm, 500);

    const handleGoToUpdatePage = async (id: number) => {
        await router.push(`update/${id}`)
    }

    const handleDeletePerson = async (id: number) => {
      setLoading(true)
       try {
        await api.delete(`form/${id}`)

        setLoading(false)
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
        setLoading(false)
       }
    }

    async function loadList() {
      try {
          const response = await api.get<ListProps[]>("/form");
          const data = response.data.filter((person) => person.name.includes(debounce))

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
    }, [debounce, loading]);


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
        <Flex
          as="label"
          flex="1"
          py="1rem"
          px="2rem"
          ml="16rem"
          mt="1rem"
          maxWidth={400}
          alignSelf="center"
          alignItems="center"
          color="gray.200"
          position="relative"
          bg="gray.800"
          borderRadius="full"
        >
          <Input
            type="text"
            value={searchTerm}
            px="1rem"
            mr="1rem"
            color="gray.50"
            variant="unstyled"
            placeholder="Buscar por nomes"
            _placeholder={{ color: "gray.400" }}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <Icon as={RiSearchLine} fontSize="20" />
        </Flex>
        <Box
          border="1px"
          borderColor="gray.600"
          borderRadius="1rem"
          p="1rem"
          mt="2rem"
          mb="4rem"
          minW="620px"
        >
          <TableContainer>
            {loading ? (
              <Flex justifyContent="center">
                <Spinner color='blue.500' thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  size='xl'
                />
              </Flex>
            ) : (
              <Table size="sm" variant="striped">
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
                  {user.length > 0 ? user.map((row: ListProps, index) => {
                    return (
                      <Tr key={index}>
                        <Td
                          maxW="200px"
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          title={row.name}
                        >{row.name}</Td>
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
                              <Icon as={BsInfoCircle} fontSize={20} title="Não há alterações" />
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
                                onClick={() => handleDeletePerson(row.id)}
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
                    )
                  }) : (
                    <TableCaption fontSize="md">
                      Nenhum registro encontrado
                    </TableCaption>
                  )
                  }
                </Tbody>
              </Table>
            )}
          </TableContainer>
          <Divider mt="2rem" />
        </Box>
      </Flex>
    </Box>
  );
}