import React from "react";
import {
    Spacer,
    Text,
    Box,
    Container,
    Center,
    Heading,
    HStack,
    VStack,
    Stack,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";

import { medusaServer } from "src/utils/medusaServer";
import { getSmallestVariantPrice } from "src/utils/prices";

import { Layout, ProductItem, Button } from "@components";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import { SimpleGrid } from "@chakra-ui/react";

import { Product } from "@medusajs/medusa";

interface HomeProps {
    allProducts: {
        products: Product[];
        count: number;
    };
}

const Home: React.FC<HomeProps> = ({ allProducts }) => {
    console.log("🚀 ~ file: index.tsx ~ line 43 ~ allProducts", allProducts);
    return (
        <Layout
            headerPosition="absolute"
            logoIsDark={false}
            headerTextColor="white"
        >
            {/* Hero slider section */}
            <Swiper slidesPerView={1} navigation={true} modules={[Navigation]}>
                <SwiperSlide>
                    <Box as="section" h="100vh" position="relative">
                        <Image
                            src="/assets/images/slide-1.jpg"
                            alt="Slide 1"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                        />
                        <Container
                            maxW="container.xl"
                            position="relative"
                            paddingTop="136px"
                            h="full"
                        >
                            <Center h="full">
                                <VStack textAlign="center">
                                    <Heading
                                        as="h1"
                                        fontSize="7xl"
                                        fontWeight="bold"
                                        color="white"
                                    >
                                        New Arrival
                                    </Heading>
                                    <HStack>
                                        <Button size="lg">SHOP NOW</Button>
                                        <Button size="lg" colorScheme="gray">
                                            CATEGORY
                                        </Button>
                                    </HStack>
                                </VStack>
                            </Center>
                        </Container>
                    </Box>
                </SwiperSlide>
                <SwiperSlide>
                    <Box as="section" h="100vh" position="relative">
                        <Image
                            src="/assets/images/slide-2.jpg"
                            alt="Slide 1"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                        />
                        <Container
                            maxW="container.xl"
                            position="relative"
                            paddingTop="136px"
                            h="full"
                        >
                            <Center h="full">
                                <VStack textAlign="center">
                                    <Heading
                                        as="h1"
                                        fontSize="7xl"
                                        fontWeight="bold"
                                        color="white"
                                    >
                                        Men collection
                                    </Heading>
                                    <HStack>
                                        <Button size="lg">SHOP NOW</Button>
                                        <Button size="lg">CATEGORY</Button>
                                    </HStack>
                                </VStack>
                            </Center>
                        </Container>
                    </Box>
                </SwiperSlide>
            </Swiper>
            {/* Banner section */}
            <Container as="section" pt="8" maxW="container.xl">
                <SimpleGrid gap="8" columns={{ base: 1, md: 2 }} height="360px">
                    <Box position="relative">
                        <Image
                            src="/assets/images/banner1.jpg"
                            alt="Jacket 1"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                        />
                        <Box position="absolute" p="8" bottom="0" w="full">
                            <Box bg="white" p="8">
                                <HStack justifyContent="space-between">
                                    <Box>
                                        <Text
                                            textTransform="uppercase"
                                            color="green.500"
                                        >
                                            Trendy item
                                        </Text>
                                        <Heading fontSize="2xl">
                                            New Year Trend Coming 2022
                                        </Heading>
                                    </Box>
                                    <Button variant="link">DISCOVER</Button>
                                </HStack>
                            </Box>
                        </Box>
                    </Box>
                    <Box position="relative">
                        <Image
                            src="/assets/images/banner2.jpg"
                            alt="Jacket 1"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                        />
                        <Box position="absolute" p="8" bottom="0" w="full">
                            <Box bg="white" p="8">
                                <Box>
                                    <Text
                                        textTransform="uppercase"
                                        color="green.500"
                                    >
                                        GET THE LOOK
                                    </Text>
                                    <Heading fontSize="2xl">
                                        Festive Looks
                                    </Heading>
                                </Box>
                                <Button mt="4">DISCOVER</Button>
                            </Box>
                        </Box>
                    </Box>
                </SimpleGrid>
            </Container>
            <Container as="section" maxW="container.xl" mt="20">
                <Tabs variant="unstyled">
                    <Stack direction="row" justifyContent="space-between">
                        <Box>
                            <Heading fontSize="3xl">Brand new products</Heading>
                        </Box>
                        <TabList>
                            <Tab
                                _selected={{
                                    color: "white",
                                    bg: "primary.500",
                                }}
                            >
                                ALL
                            </Tab>
                            <Tab
                                _selected={{
                                    color: "white",
                                    bg: "primary.500",
                                }}
                            >
                                FURNITURE
                            </Tab>
                            <Tab
                                _selected={{
                                    color: "white",
                                    bg: "primary.500",
                                }}
                            >
                                MAN CLOTH
                            </Tab>
                            <Tab
                                _selected={{
                                    color: "white",
                                    bg: "primary.500",
                                }}
                            >
                                WOMAN CLOTH
                            </Tab>
                        </TabList>
                    </Stack>
                    <Text color="gray.600">
                        Browse the huge variety of our products
                    </Text>
                    <TabPanels>
                        <TabPanel>
                            <SimpleGrid
                                gap="8"
                                columns={{ base: 1, sm: 2, md: 3 }}
                            >
                                {/* SHOW 6 products */}
                                {allProducts.products &&
                                    allProducts.products.map(
                                        (
                                            product, // Map the array to show the products
                                        ) => (
                                            <ProductItem
                                                key={product.id}
                                                title={product.title}
                                                slug={product.handle}
                                                thumbnail={product.thumbnail}
                                                price={getSmallestVariantPrice(
                                                    product.variants,
                                                )}
                                                /* price={formatPrice(
                                                    product.variants[0],
                                                )} */
                                            />
                                        ),
                                    )}
                            </SimpleGrid>
                        </TabPanel>
                        <TabPanel>
                            <p>FURNITURE</p>
                        </TabPanel>
                        <TabPanel>
                            <p>MAN CLOTH</p>
                        </TabPanel>
                        <TabPanel>
                            <p>WOMAN CLOTH</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </Layout>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await medusaServer.get("/products?limit=6");

    return {
        props: { allProducts: data },
    };
};
