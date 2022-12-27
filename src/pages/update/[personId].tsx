import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Center, Flex, FormControl, FormLabel, HStack, Heading, Input, Select } from "@chakra-ui/react";
import Head from "next/head";
import { UpdateProps } from "../../types/type";
import { api } from "../../api/api";
import { MdNavigateNext } from "react-icons/md";

export async function getStaticProps(contex: any) {
  const { params } = contex;

  const data = await api.get(`http://localhost:3333/form/${params.personId}`);

  const person = data.data

  return {
    props: { person },
  };
}

export async function getStaticPaths() {
  const response = await api.get("http://localhost:3333/form");

  const data = response.data

  const paths = data.map((person: UpdateProps) => {
    return {
      params: {
        personId: `${person.id}`,
      },
    };
  });

  return { paths, fallback: false };
}

type updatePersonId = {
  person: UpdateProps;
};

export default function UpdatePerson({ person }: updatePersonId) {
  return (
    <Box>
      <Head>
        <title>Form | Editar</title>
      </Head>
      <Breadcrumb
        fontWeight="medium"
        fontSize="sm"
        ml="1rem"
        mt="1rem"
        mb="4rem"
        separator={<MdNavigateNext color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/list">Listagem</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage color="blue.400">
          <BreadcrumbLink href="/update">Editar</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex
        height="100%"
        flexDirection="column"
        justifyContent="center"
        align="center"
        px="2rem"
      >
        <Heading as="h2" mb="2rem" fontSize={["lg", "2xl"]}>
          Editar Formulário 
        </Heading>
        <FormControl maxWidth="20rem">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            id="name"
            placeholder="Seu nome"
            defaultValue={person.name}
          />

          <FormLabel mt="1rem">E-mail</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Seu e-mail"
            defaultValue={person.email}
          />

          <FormLabel mt="1rem">Senha</FormLabel>
          <Input
            type="password"
            id="password"
            placeholder="Sua senha"
            defaultValue={person.password}
          />

          <FormLabel mt="1rem">Profissões</FormLabel>
          <Select defaultValue="0">
            <option value="0">{person.profession}</option>
            <option value="Desenvolvedor">Desenvolvedor</option>
            <option value="Agilista">Agilista</option>
            <option value="QA">QA</option>
            <option value="Product Ower">Product Ower</option>
            <option value="Tech Leader">Tech Leader</option>
            <option value="Analista SEO">Analista SEO</option>
            <option value="Outros">Outros</option>
          </Select>

          <Center mt="1.5rem">
            <Button colorScheme="blue" w="100%">
              Atualizar
            </Button>
          </Center>
        </FormControl>
      </Flex>
    </Box>
  );
}