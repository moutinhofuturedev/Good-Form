import { Center, Icon, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi"

export default function Home() {
    return (
        <Center h="100vh">
            <Head>
                <title>Form | React</title>
            </Head>
            <Link href="/dash" passHref>
                <Text fontSize="2xl" fontWeight="bold">
                    Formulário <Icon as={BiLinkExternal} />
                </Text>
            </Link>
        </Center>
    )
}