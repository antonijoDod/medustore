import React, { useState } from "react";
import { Layout, RadioCard, Button } from "@components";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Divider,
    Stack,
    useRadioGroup,
    TableContainer,
    Table,
    Tbody,
    Tr,
    Td,
    IconButton,
    Flex,
    HStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import {
    MdOutlineHorizontalRule,
    MdOutlineAdd,
    MdOutlineFavorite,
} from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper";

const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const productColorOptions = ["white", "red", "blue", "green"];

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "productColor",
        defaultValue: "white",
        onChange: console.log,
    });

    const group = getRootProps();
    return (
        <Layout logoIsDark>
            {/* Header */}
            <Box as="section" h="350px" position="relative">
                <Image
                    src="/assets/images/page-title.png"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                />
                <Container
                    maxW="container.xl"
                    position="inherit"
                    h="full"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box textAlign="center">
                        <Heading mb="4">Our shop</Heading>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <BreadcrumbLink as={NextLink} href="/">
                                    Home
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink as={NextLink} href="/shop">
                                    Shop
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem isCurrentPage>
                                <BreadcrumbLink href="#">
                                    Product title
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Box>
                </Container>
            </Box>
            {/* Product container */}
            <Container maxW="container.xl" mt="20">
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="8">
                    {/* Left side */}
                    <Box>
                        <Swiper
                            style={{
                                "--swiper-navigation-color": "#fff",
                                "--swiper-pagination-color": "#fff",
                            }}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2"
                        >
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                            </SwiperSlide>
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                    <Box textAlign={{ base: "center", md: "left" }}>
                        <Text
                            textTransform="uppercase"
                            fontSize="xl"
                            color="gray.600"
                        >
                            Decor, Nike
                        </Text>
                        <Heading size="xl" as="h1">
                            Raglan Baseball Style shirt
                        </Heading>
                        <Text
                            fontSize="4xl"
                            fontWeight="light"
                            color="primary.500"
                        >
                            $99.99
                        </Text>
                        <Divider />
                        <Stack
                            my="8"
                            direction={{ base: "column", md: "row" }}
                            alignItems="center"
                        >
                            <Box mr="4">COLORS: </Box>
                            <HStack {...group}>
                                {productColorOptions.map((value) => {
                                    const radio = getRadioProps({ value });
                                    return <RadioCard key={value} {...radio} />;
                                })}
                            </HStack>
                        </Stack>
                        <Divider />
                        <Text my="8">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut
                            aliquip.
                        </Text>
                        <Divider />
                        <TableContainer my="8">
                            <Table variant="simple" fontSize="sm">
                                <Tbody>
                                    <Tr>
                                        <Td
                                            w="50px"
                                            fontWeight="500"
                                            color="gray.900"
                                            paddingLeft="0"
                                        >
                                            Brands:
                                        </Td>
                                        <Td color="gray.600">Nike</Td>
                                    </Tr>
                                    <Tr>
                                        <Td
                                            w="50px"
                                            fontWeight="500"
                                            color="gray.900"
                                            paddingLeft="0"
                                        >
                                            Product Code:
                                        </Td>
                                        <Td color="gray.600">XZ524</Td>
                                    </Tr>
                                    <Tr>
                                        <Td
                                            w="50px"
                                            fontWeight="500"
                                            color="gray.900"
                                            paddingLeft="0"
                                        >
                                            Stock:
                                        </Td>
                                        <Td color="gray.600">In stock</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <HStack>
                            <HStack bg="primary.100" p={2} rounded="full">
                                <IconButton
                                    icon={<MdOutlineHorizontalRule />}
                                    isRound
                                    aria-label="Remove product"
                                    bg="white"
                                />
                                <Text px="4" fontSize="sm" color="gray.600">
                                    1
                                </Text>
                                <IconButton
                                    icon={<MdOutlineAdd />}
                                    isRound
                                    aria-label="Add product"
                                    bg="white"
                                />
                            </HStack>
                            <Box bg="primary.100" p="2" rounded="full">
                                <IconButton
                                    icon={<MdOutlineFavorite />}
                                    isRound
                                    aria-label="Add to wishlist"
                                    bg="transparent"
                                    p="2"
                                    color="primary.500"
                                    _active={{ bg: "primary.500" }}
                                />
                            </Box>
                        </HStack>
                        <Button
                            rounded="none"
                            mt="8"
                            size="lg"
                            _hover={{ bgColor: "primary.100", color: "black" }}
                        >
                            ADD TO CART
                        </Button>
                    </Box>
                </SimpleGrid>
            </Container>
        </Layout>
    );
};

export default Product;