import { Center } from "@chakra-ui/react";
import Head from "next/head";
import { PageLink } from "../components/Link/PageLink";

export default function Home() {
    return (
        <Center h="100vh">
            <Head>
                <title>Form | React</title>
            </Head>
            <PageLink href="/dash"/>
        </Center>
    )
}