import { Button, Center, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Select, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormData } from "../types/type";
import { useToast } from '@chakra-ui/react'
import { useRouter } from "next/router";
import { api } from "../api/api";
import { createdAt } from '../utils/showDate';

export function Form() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>()
    const toast = useToast()
    const router = useRouter()

    const OnSubmit = async (data: FormData) => {
        try {
          await new Promise(resolve => setTimeout(() => {
            createdAt()
              resolve(
                  api.post("/form", {
                      name: data.name,
                      email: data.email,
                      password: data.password,
                      privacyTerms: data.privacyTerms,
                      profession: data.profession,
                      createdAt: createdAt()
                  })
              )
          }, 5000))
          toast({
            title: 'Conta criada.',
            description: "Cadastro realizado com sucesso.",
            status: 'success',
            duration: 8000,
            isClosable: true,
            position:  "top-left"
          })
  
          router.push("/list")
        } catch (error) {
          toast({
            title: 'Erro de cadastro',
            status: "error",
            description: 'Não foi possível fazer novo registro',
            duration: 6000,
            isClosable: true,
            position: "top-left"
          })
        }
    }

    return (
      <Flex
        height="100%"
        flexDirection="column"
        justifyContent="center"
        align="center"
        px="2rem"
      >
        <Heading as="h2" mb="2rem" fontSize={["lg", "2xl"]}>
          Formulário React Hook Form
        </Heading>
        <FormControl minW={["15rem", "20rem"]}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            id="name"
            placeholder="Seu nome"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <Text color="red.500" fontSize="sm">
              Este campo é obrigatório
            </Text>
          )}

          <FormLabel mt="1rem">E-mail</FormLabel>
          <Input
            type="email"
            id="email"
            placeholder="Seu e-mail"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <Text color="red.500" fontSize="sm">
              Este campo é obrigatório
            </Text>
          )}

          <FormLabel mt="1rem">Senha</FormLabel>
          <Input
            type="password"
            id="password"
            placeholder="Sua senha"
            {...register("password", { required: true, minLength: 10 })}
          />
          {errors.password?.type === "required" && (
            <Text color="red.500" fontSize="sm">
              Este campo é obrigatório
            </Text>
          )}
          {errors.password?.type === "minLength" && (
            <Text color="red.500" fontSize="sm">
              Senha deve conter 10 caracteres
            </Text>
          )}

          <FormLabel mt="1rem">Profissões</FormLabel>
          <Select
            defaultValue="0"
            {...register("profession", { validate: (value) => value !== "0" })}
          >
            <option value="0">Selecione sua profissão...</option>
            <option value="Desenvolvedor">Desenvolvedor</option>
            <option value="Agilista">Agilista</option>
            <option value="QA">QA</option>
            <option value="Product Ower">Product Ower</option>
            <option value="Tech Leader">Tech Leader</option>
            <option value="Analista SEO">Analista SEO</option>
            <option value="Outros">Outros</option>
          </Select>
          {errors.profession?.type === "validate" && (
            <Text color="red.500" fontSize="sm">
              Este campo é obrigatório
            </Text>
          )}
          <Checkbox
            mt="1rem"
            {...register("privacyTerms", {
              validate: (value) => value === true,
            })}
          >
            <Text fontSize={["smaller", "sm", "medium"]}>
              Eu concordo com os termos de privacidade
            </Text>
          </Checkbox>
          {errors.privacyTerms?.type === "validate" && (
            <Text color="red.500" fontSize="sm">
              Você deve aceitar os termos de privacidade
            </Text>
          )}
          <Center mt="1.5rem">
            <Button
              colorScheme="blue"
              w="100%"
              onClick={() => handleSubmit(OnSubmit)()}
              isLoading={isSubmitting}
            >
              Criar conta
            </Button>
          </Center>
        </FormControl>
      </Flex>
    );
}