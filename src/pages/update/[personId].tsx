import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData, updatePersonId } from "../../types/type";
import { api } from "../../api/api";
import { MdNavigateNext } from "react-icons/md";
import { createdAt as updatedAt } from "../../utils/showDate";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { FormUpdateSchema } from "../../validation/FormSchemaValidation";

interface dataProps extends ParsedUrlQuery {
  personId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { personId } = context.query as dataProps;
  const data = await api.get(`http://localhost:3333/persons/${personId}`);
  const person = await data.data;

  return {
    props: { person },
  };
};

export default function UpdatePerson({ person }: updatePersonId) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: yupResolver(FormUpdateSchema) });
  const toast = useToast();
  const router = useRouter();

  const OnSubmit: SubmitHandler<FormData> = async (data) => {
    updatedAt();
    api.patch(`/persons/${person.id}`, {
      name: data.name,
      email: data.email,
      password: data.password,
      profession: data.profession,
      createdAt: data.createdAt,
      updatedAt: updatedAt(),
    }).then(() => {
      router.push("/list");
      toast({
        title: "Registro alterado.",
        description: "Atualização feita com sucesso.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-left",
      });
    }).catch(() => {
      toast({
        title: "Error",
        description: "Erro ao tentar atualizar registro",
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top-left",
      });
    })
  };

  return (
    <Box h="100vh">
      <Head>
        <title>Form | Editar</title>
      </Head>
      <Breadcrumb
        fontWeight="medium"
        fontSize="sm"
        ml="1rem"
        mt="1rem"
        mb="-2.5rem"
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
          Editar registro de {person.name}
        </Heading>
        <FormControl maxWidth="20rem">
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            id="name"
            placeholder="Seu nome"
            defaultValue={person.name}
            {...register("name")}
          />

          <FormLabel mt="1rem">E-mail</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Seu e-mail"
            defaultValue={person.email}
            {...register("email")}
          />
          <Text color="red.500">{errors.email?.message}</Text>

          <FormLabel mt="1rem">Senha</FormLabel>
          <Input
            type="password"
            id="password"
            placeholder="Sua senha"
            defaultValue={person.password}
            {...register("password")}
          />
          <Text color="red.500">{errors.password?.message}</Text>

          <FormLabel mt="1rem">Profissões</FormLabel>
          <Select defaultValue="0" {...register("profession")}>
            <option value={person.profession}>{person.profession}</option>
            <option value="Desenvolvedor">Desenvolvedor</option>
            <option value="Agilista">Agilista</option>
            <option value="QA">QA</option>
            <option value="Product Ower">Product Ower</option>
            <option value="Tech Leader">Tech Leader</option>
            <option value="Analista SEO">Analista SEO</option>
            <option value="Outros">Outros</option>
          </Select>

          <Center mt="1.5rem">
            <Button
              colorScheme="blue"
              w="100%"
              onClick={() => handleSubmit(OnSubmit)()}
              isLoading={isSubmitting}
            >
              Atualizar
            </Button>
          </Center>
        </FormControl>
      </Flex>
    </Box>
  );
}
