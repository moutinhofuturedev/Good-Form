import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Center, Flex, FormControl, FormLabel, Heading, Input, Select, useToast } from "@chakra-ui/react";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormData, updatePersonId } from '../../types/type';
import { api } from '../../api/api';
import { MdNavigateNext } from "react-icons/md";
import { createdAt as updatedAt } from "../../utils/showDate";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface dataProps extends ParsedUrlQuery {
  personId: string
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const { personId } = context.query as dataProps;
  const data = await fetch(`http://localhost:3333/form/${personId}`);
  const person = await data.json()

  return {
    props: { person },
  };
}

export default function UpdatePerson({ person }: updatePersonId) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>();
  const toast = useToast();
  const router = useRouter();

  const OnSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await new Promise((resolve) =>
        setTimeout(() => {
          updatedAt();
          resolve(
            api.patch(`/form/${person.id}`, {
              name: data.name,
              email: data.email,
              password: data.password,
              profession: data.profession,
              createdAt: data.createdAt,
              updatedAt: updatedAt(),
            })
          );
        }, 5000)
      );
      toast({
        title: "Registro alterado.",
        description: "Atualização feita com sucesso.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-left",
      });

      router.push("/list");
    } catch (error) {
      toast({
        title: "Error",
        description: "Erro ao tentar atualizar registro",
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top-left",
      })
    }
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

          <FormLabel mt="1rem">Senha</FormLabel>
          <Input
            type="text"
            id="password"
            placeholder="Sua senha"
            defaultValue={person.password}
            {...register("password")}
          />

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