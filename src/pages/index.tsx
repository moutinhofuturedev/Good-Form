import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { PageLink } from "../components/Link";
import { MdNavigateNext } from "react-icons/md"

export default function Home() {
    return (
      <Box h="100vh">
        <Head>
          <title>Form | Home</title>
        </Head>
        <Breadcrumb
          spacing="8px"
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
            <BreadcrumbLink href="/dash">Formulário</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage color="blue.400">
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="center" alignItems="center">
          <PageLink href="/dash" />
        </Flex>
      </Box>
    );
}