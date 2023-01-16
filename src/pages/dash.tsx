import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { MdNavigateNext } from "react-icons/md";
import { Form } from "../components/Form";

export default function Dash() {
  return (
    <Box h="100vh">
      <Head>
        <title>Form | React</title>
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
          <BreadcrumbLink href="/list">Listagem</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage color="blue.400">
          <BreadcrumbLink href="/dash">Formulário</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="center" alignItems="center">
        <Form />
      </Flex>
    </Box>
  );
}
