import Link from "next/link";
import { Text, Icon } from "@chakra-ui/react";
import { BiLinkExternal } from "react-icons/bi";

type LinkProps = {
    href: string
}

export function PageLink({ href }: LinkProps) {
    return (
        <Link href={href} passHref>
            <Text fontSize="2xl" fontWeight="bold">
                Formulário <Icon as={BiLinkExternal} />
            </Text>
        </Link>
    )
}