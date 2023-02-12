import { Button, Center, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Select, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useToast } from '@chakra-ui/react'
import { FormData } from "../types/type";
import { api } from "../api/api";
import { createdAt } from '../utils/showDate';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FormCreateSchema } from "../validation/FormSchemaValidation";

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(FormCreateSchema) });
  const toast = useToast();
  const router = useRouter();

  const OnSubmit: SubmitHandler<FormData> = (data) => {
    createdAt();
    api.post("/persons", {
      name: data.name,
      email: data.email,
      password: data.password,
      privacyTerms: data.privacyTerms,
      profession: data.profession,
      createdAt: createdAt(),
    }).then(() => {
      router.push("/list");
      toast({
        title: "Registrado.",
        description: "Registro realizado com sucesso.",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "top-left",
      });
    }).catch(() => {
      toast({
        title: "Erro de cadastro",
        status: "error",
        description: "Não foi possível fazer novo registro",
        duration: 6000,
        isClosable: true,
        position: "top-left",
      });
    })
  };

  return (
    <Flex
      height="100%"
      flexDirection="column"
      justifyContent="center"
      align="center"
      px="2rem"
      mb="4rem"
    >
      <Heading as="h2" mb="2rem" fontSize={["lg", "2xl"]}>
        Formulário React Hook Form
      </Heading>
      <FormControl minW={["15rem", "20rem"]}>
        <FormLabel>Nome</FormLabel>
        <Input
          type="text"
          id="name"
          placeholder="Seu nome"
          {...register("name")}
        />
        <Text color="red.500">{errors.name?.message}</Text>

        <FormLabel mt="1rem">E-mail</FormLabel>
        <Input
          type="email"
          id="email"
          placeholder="Seu e-mail"
          {...register("email")}
        />
        <Text color="red.500">{errors.email?.message}</Text>

        <FormLabel mt="1rem">Senha</FormLabel>
        <Input
          type="password"
          id="password"
          placeholder="Sua senha"
          {...register("password")}
        />
        <Text color="red.500">{errors.password?.message}</Text>

        <FormLabel mt="1rem">Profissões</FormLabel>
        <Select defaultValue="0" {...register("profession")}>
          <option value="0">Selecione sua profissão...</option>
          <option value="Desenvolvedor">Desenvolvedor</option>
          <option value="Agilista">Agilista</option>
          <option value="QA">QA</option>
          <option value="Product Ower">Product Ower</option>
          <option value="Tech Leader">Tech Leader</option>
          <option value="Analista SEO">Analista SEO</option>
          <option value="Outros">Outros</option>
        </Select>
        <Text color="red.500">{errors.profession?.message}</Text>

        <Checkbox mt="1rem" {...register("privacyTerms")}>
          <Text fontSize={["smaller", "sm", "medium"]}>
            Eu concordo com os termos de privacidade
          </Text>
        </Checkbox>
        <Text color="red.500">{errors.privacyTerms?.message}</Text>

        <Center mt="1.5rem">
          <Button
            colorScheme="blue"
            w="100%"
            onClick={() => handleSubmit(OnSubmit)()}
          >
            Registrar
          </Button>
        </Center>
      </FormControl>
    </Flex>
  );
}