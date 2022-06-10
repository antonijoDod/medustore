import React, { FC } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

interface Props {
    title: string;
    slug: string;
    thumbnail: string;
    price: string;
}

const ProductItem: FC<Props> = ({ title, slug, price, thumbnail }) => {
    return (
        <NextLink href={`/product/${slug}`}>
            <Box>
                <Box h="400px" w="full" position="relative">
                    <Image
                        src={
                            typeof thumbnail === "string"
                                ? thumbnail
                                : "/assets/images/placeholder_300x300.png"
                        }
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        alt={title}
                    />
                    <Box position="absolute" p="8"></Box>
                </Box>
                <Box color="primary.500" mt="8" mb="2">
                    TAGS
                </Box>
                <Heading size="md" mb="2">
                    {title}
                </Heading>
                <Text>{price} Eur</Text>
            </Box>
        </NextLink>
    );
};

export default ProductItem;
