import React, { FC, useState } from "react";
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
    useToast,
    HStack,
} from "@chakra-ui/react";

import Image from "next/image";
import NextLink from "next/link";
import { medusaServer } from "src/utils/medusaServer";
import { Product as TProduct } from "@medusajs/medusa";

import { useAddItemToCartMutation } from "@redux/services/cart";

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
import { formatPrice } from "src/utils/prices";

import { useAppDispatch } from "@redux/store";
import { open } from "@redux/actions";

interface ProductProps {
    product: TProduct;
}

const Product: FC<ProductProps> = ({ product }) => {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const [addItemToCart] = useAddItemToCartMutation();
    // Sync images on slider, follow current image
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [currentVariant, setCurrentVariant] = useState(
        product.options[0].values[0].variant_id,
    );

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "productColor",
        defaultValue: product.options[0].values[0].variant_id,
        onChange: (id) => setCurrentVariant(id),
    });

    // Get current product variant and add to cart
    const handleAddToCart = async () => {
        const result = await addItemToCart({
            variant_id: currentVariant,
            quantity: 1,
        });
        if ("error" in result) {
            toast({
                title: "Something is wrong",
                status: "warning",
                isClosable: true,
                duration: 5000,
            });
        } else {
            toast({
                title: "Item is added in cart",
                status: "success",
                isClosable: true,
                duration: 5000,
            });
            dispatch(open());
        }
    };

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
                                    {product.title}
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
                        {product.images.length === 0 && (
                            <Box position="relative" height="100%">
                                <Image
                                    src="/assets/images/placeholder_300x300.png"
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center"
                                />
                            </Box>
                        )}
                        <Swiper
                            style={{
                                "--swiper-navigation-color": "#fff",
                                "--swiper-pagination-color": "#fff",
                                height: 500,
                            }}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                        >
                            {product.images.map((image) => (
                                <SwiperSlide
                                    key={image.id}
                                    style={{
                                        position: "relative",
                                        height: "100%",
                                    }}
                                >
                                    <Image
                                        src={image.url}
                                        alt={product.title}
                                        layout="fill"
                                        objectFit="cover"
                                        objectPosition="center"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            style={{ height: 150, marginTop: 16 }}
                        >
                            {product.images.map((image) => (
                                <SwiperSlide
                                    key={image.id}
                                    style={{
                                        position: "relative",
                                        height: "100%",
                                    }}
                                >
                                    <Image
                                        src={image.url}
                                        alt={product.title}
                                        layout="fill"
                                        objectFit="cover"
                                        objectPosition="center"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>
                    <Box textAlign={{ base: "center", md: "left" }}>
                        <Text
                            textTransform="uppercase"
                            fontSize="xl"
                            color="gray.600"
                        >
                            {/*  {product.tags.map((tag, index) => (
                                <Text key={index} textTransform="uppercase">
                                    {tag}
                                </Text>
                            ))} */}
                            <Text textTransform="uppercase">
                                {product.collection && product.collection.title}
                            </Text>
                        </Text>
                        <Heading size="xl" as="h1">
                            {product.title}
                        </Heading>
                        <Text
                            fontSize="4xl"
                            fontWeight="light"
                            color="primary.500"
                        >
                            {product.variants.length < 2
                                ? formatPrice(product.variants[0])
                                : formatPrice(
                                      product.variants.filter(
                                          (variant) =>
                                              variant.id === currentVariant,
                                      )[0],
                                  )}
                        </Text>
                        <Divider />
                        {product.options &&
                            product.options.map((option) => (
                                <>
                                    <Stack
                                        my="8"
                                        direction={{
                                            base: "column",
                                            md: "row",
                                        }}
                                        alignItems="center"
                                        key={option.id}
                                    >
                                        <Box mr="4" textTransform="uppercase">
                                            {option.title}:
                                        </Box>
                                        <HStack {...group}>
                                            {option.values.map((value) => {
                                                const radio = getRadioProps({
                                                    title: value.value,
                                                    value: value.variant_id,
                                                });
                                                return (
                                                    <RadioCard
                                                        key={value.id}
                                                        {...radio}
                                                    />
                                                );
                                            })}
                                        </HStack>
                                    </Stack>
                                    <Divider />
                                </>
                            ))}
                        <Text my="8">{product.description}</Text>
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
                                            Tags:
                                        </Td>
                                        <Td color="gray.600">
                                            <HStack>
                                                {product.tags?.map((tag) => (
                                                    <Button
                                                        size="xs"
                                                        key={tag.id}
                                                        colorScheme="blackAlpha"
                                                    >
                                                        {tag.value}
                                                    </Button>
                                                ))}
                                            </HStack>
                                        </Td>
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
                        {/*   <HStack>
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
                        </HStack> */}
                        <Button
                            onClick={handleAddToCart}
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

export const getStaticPaths = async () => {
    const res = await medusaServer("/products");
    const { products }: { products: TProduct[] } = res.data;
    const paths = products.map((product) => ({
        params: { id: product.id },
    }));

    return { paths, fallback: false };
};

export const getStaticProps = async ({
    params,
}: {
    params: { id: string };
}) => {
    const res = await medusaServer(`/products/${params.id}`);
    const { product } = await res.data;

    return { props: { product } };
};
