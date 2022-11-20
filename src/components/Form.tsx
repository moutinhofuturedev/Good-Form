import { Button, Center, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Select, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormData {
    name: string
    email: string;
    password: string;
    privacyTerms: string
    profession: string;
}

export function Form() {
    const [itens, setItens] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        privacyTerms: '',
        profession: '',
    })
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const OnSubmit = (data: FormData) => {
        setItens({
            name: data.name,
            email: data.email,
            password: data.password,
            privacyTerms: data.privacyTerms,
            profession: data.profession
        })
    }

    return (
        <Flex height="100%" flexDirection="column" justifyContent="center" align="center">
            <Heading as="h2" mb="2rem" fontSize="2xl">Formulário React Hook Form</Heading>
            <FormControl minW="30rem">
                <FormLabel>Name</FormLabel>
                <Input type="text" id="name" placeholder="Seu nome" {...register("name", { required: true })} />
                {errors.name?.type === "required" && (
                    <Text color="red.500" fontSize="sm">Este campo é obrigatório</Text>
                )}

                <FormLabel mt="1rem">E-mail</FormLabel>
                <Input type="email" id="email" placeholder="Seu e-mail" {...register("email", { required: true })} />
                {errors.email?.type === "required" && (
                    <Text color="red.500" fontSize="sm">Este campo é obrigatório</Text>
                )}

                <FormLabel mt="1rem">Senha</FormLabel>
                <Input type="password" id="password" placeholder="Sua senha" {...register("password", { required: true, minLength: 10 })} />
                {errors.password?.type === "required" && (
                    <Text color="red.500" fontSize="sm">Este campo é obrigatório</Text>
                )}
                {errors.password?.type === "minLength" && (
                    <Text color="red.500" fontSize="sm">Senha deve conter 10 caracteres</Text>
                )}

                <FormLabel mt="1rem">Profissões</FormLabel>
                <Select defaultValue="0" {...register("profession", { validate: (value) => value !== "0" })}>
                    <option value="0">Selecione sua profissão...</option>
                    <option value="Desenvolvedor">Desenvolvedor</option>
                    <option value="Agilista">Agilista</option>
                    <option value="QA">QA</option>
                    <option value="Outros">Outros</option>
                </Select>
                {errors.profession?.type === "validate" && (
                    <Text color="red.500" fontSize="sm">Este campo é obrigatório</Text>
                )}
                <Checkbox mt="1rem" {...register("privacyTerms", { validate: (value) => value === "true" })}>
                  Eu concordo com os termos de privacidade
                </Checkbox>
                {errors.privacyTerms?.type === "validate" && (
                    <Text color="red.500" fontSize="sm">Você deve aceitar os termos de privacidade</Text>
                )}
                <Center mt="1.5rem">
                    <Button colorScheme="blue" w="100%" onClick={() => handleSubmit(OnSubmit)()}>
                        Criar conta
                    </Button>
                </Center>
            </FormControl>
            <VStack spacing="0.5rem" fontSize="sm" position="absolute" ml="55rem" align="flex-start">
                <Text>{itens.name}</Text>
                <Text>{itens.email}</Text>
                <Text>{itens.password}</Text>
                <Text>{itens.profession}</Text>
            </VStack>
        </Flex>
    )
}