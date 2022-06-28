import React from "react";
import {
    Box,
    Container,
    Text,
    SimpleGrid,
    Link,
    HStack,
    Icon,
    Heading,
    List,
    ListItem,
    Stack,
    Divider,
} from "@chakra-ui/react";
import Image from "next/image";
import {
    MdOutlineTimelapse,
    MdOutlineFacebook,
    MdOutlineMail,
} from "react-icons/md";

const Footer = () => {
    return (
        <Box as="footer" textAlign={{ base: "center", md: "left" }} mt="16">
            <Container maxW="container.xl">
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap="4">
                    <Box>
                        <Box mb="4">
                            <Image
                                src="/assets/svg/logo-black.svg"
                                height="36"
                                width="174"
                                layout="fixed"
                            />
                        </Box>
                        <Text color="gray.600" fontSize="sm" mb={8}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore mag na aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </Text>
                        <HStack
                            alignItems="center"
                            justifyContent={{ base: "center", md: "left" }}
                        >
                            <Icon
                                as={MdOutlineTimelapse}
                                fontSize="4xl"
                                color="primary.500"
                            />
                            <Box>
                                <Box color="gray.600" fontSize="sm">
                                    Got Questions ? Call me 24/7!
                                </Box>
                                <Box fontSize="xl">(+353) 89 950 8239</Box>
                            </Box>
                        </HStack>
                    </Box>
                    <Box>
                        <Heading fontSize="xl" mb="10">
                            Social media
                        </Heading>
                        <List color="gray.600" fontSize="sm">
                            <ListItem>
                                <Link>Facebook</Link>
                            </ListItem>
                            <ListItem>
                                <Link>Twitter</Link>
                            </ListItem>
                            <ListItem>
                                <Link>Instagram</Link>
                            </ListItem>
                            <ListItem>
                                <Link>Pinterest</Link>
                            </ListItem>
                        </List>
                    </Box>
                    <Box>
                        <Heading fontSize="xl" mb="10">
                            Location
                        </Heading>
                        <List color="gray.600" fontSize="sm">
                            <ListItem>
                                <Link>Dublin</Link>
                            </ListItem>
                            <ListItem>
                                <Link>Cork</Link>
                            </ListItem>
                            <ListItem>
                                <Link>Galway</Link>
                            </ListItem>
                            <ListItem>
                                <Link>Limerick</Link>
                            </ListItem>
                        </List>
                    </Box>
                    <Box>
                        <Heading fontSize="xl" mb="10">
                            About
                        </Heading>
                        <List color="gray.600" fontSize="sm">
                            <ListItem>
                                <Link>Terms & Conditions</Link>
                            </ListItem>
                            <ListItem>
                                <Link>Privacy Policy</Link>
                            </ListItem>
                            <ListItem>
                                <Link>Contact Us</Link>
                            </ListItem>
                            <ListItem>
                                <Link>FAQ</Link>
                            </ListItem>
                        </List>
                    </Box>
                </SimpleGrid>
            </Container>
            <Container maxW="container.xl">
                <Divider my="8" />
                <Stack
                    justifyContent="space-between"
                    direction={{ base: "column", md: "row" }}
                    color="gray.600"
                    mb="4"
                >
                    <Box fontSize="sm">
                        Copyright © 2022{" "}
                        <Link
                            color="teal.500"
                            href="https://antonijo.com"
                            isExternal
                        >
                            Antonijo
                        </Link>
                        . All Rights Reserved
                    </Box>
                    <HStack fontSize="xl">
                        <Icon as={MdOutlineFacebook} />
                        <Icon as={MdOutlineMail} />
                    </HStack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
