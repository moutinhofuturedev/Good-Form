import { Center } from "@chakra-ui/react";
import Head from "next/head";
import { Form } from "../components/Form";

export default function Home() {
  return (
    <Center h="100vh" w="100vw">
      <Head>
        <title>Form | React</title>
      </Head>
      <Form />
    </Center>
  )
}
