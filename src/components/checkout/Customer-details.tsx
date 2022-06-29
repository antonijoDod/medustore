import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    SimpleGrid,
    Input,
    FormLabel,
    Flex,
    Button,
    Heading,
    FormControl,
    Select,
    Text,
    Divider,
} from "@chakra-ui/react";

import {
    useGetAllRegionsQuery,
    useGetSingleRegionQuery,
} from "@redux/services/region";

import {
    useGetCartItemsQuery,
    useUpdateCartMutation,
} from "@redux/services/cart";

type TCustomerDetails = {
    company: string | undefined;
    first_name: string | undefined;
    last_name: string | undefined;
    email: string | undefined;
    address_1: string | undefined;
    address_2?: string | undefined;
    city: string | undefined;
    country_code: string | undefined;
    province: string | undefined;
    postal_code: string | undefined;
    phone: string | undefined;
};

const CustomerDetails = ({ onNextStep, onPrevStep, activeStep, steps }) => {
    const [updateCart] = useUpdateCartMutation();
    const {
        data: cartData,
        error: cartError,
        isLoading: cartIsLoading,
    } = useGetCartItemsQuery();

    const { data: singleRegionData } = useGetSingleRegionQuery(
        cartData?.cart.region_id,
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TCustomerDetails>({
        defaultValues: cartData?.cart.shipping_address,
    });
    const onSubmit: SubmitHandler<TCustomerDetails> = async (
        data: TCustomerDetails,
    ) => {
        const result = await updateCart({
            shipping_address: {
                company: data.company,
                first_name: data.first_name,
                last_name: data.last_name,
                address_1: data.address_1,
                address_2: data.address_2,
                city: data.city,
                country_code: data.country_code,
                province: data.province,
                postal_code: data.country_code,
                phone: data.phone,
            },
            email: data.email,
        });
        onNextStep();
    };

    return (
        <>
            <Heading mt="12" fontSize="2xl" textAlign="center">
                Customer details
            </Heading>
            <Divider my="8" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="8">
                        <Box>
                            <Box mt="4">
                                <FormLabel
                                    htmlFor="country_code"
                                    color="gray.600"
                                >
                                    Select your country
                                </FormLabel>
                                <Select
                                    id="country_code"
                                    placeholder="Select your country"
                                    {...register("country_code", {
                                        required: true,
                                    })}
                                >
                                    {singleRegionData?.region.countries.map(
                                        (country) => (
                                            <option
                                                key={country.id}
                                                value={country.iso_2}
                                            >
                                                {country.display_name}
                                            </option>
                                        ),
                                    )}
                                </Select>
                            </Box>
                            <SimpleGrid
                                mt="4"
                                columns={{ base: 1, md: 2 }}
                                gap="4"
                                w="full"
                            >
                                <Box>
                                    <FormLabel
                                        htmlFor="first_name"
                                        color="gray.600"
                                    >
                                        First name
                                    </FormLabel>
                                    <Input
                                        {...register("first_name", {
                                            required: {
                                                value: true,
                                                message:
                                                    "First name is required",
                                            },
                                        })}
                                        type="text"
                                        w="full"
                                    />
                                    <Text color="red.500">
                                        {errors.first_name?.message}
                                    </Text>
                                </Box>
                                <Box>
                                    <FormLabel
                                        htmlFor="last_name"
                                        color="gray.600"
                                    >
                                        Last name
                                    </FormLabel>
                                    <Input
                                        {...register("last_name", {
                                            required: {
                                                value: true,
                                                message:
                                                    "Last name is required",
                                            },
                                        })}
                                        type="text"
                                        w="full"
                                    />
                                    <Text color="red.500">
                                        {errors.last_name?.message}
                                    </Text>
                                </Box>
                            </SimpleGrid>
                            <Box>
                                <FormLabel htmlFor="email" color="gray.600">
                                    Email
                                </FormLabel>
                                <Input
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is required",
                                        },
                                    })}
                                    type="email"
                                    w="full"
                                />
                            </Box>
                            <Box mt="4">
                                <FormLabel htmlFor="phone" color="gray.600">
                                    Phone
                                </FormLabel>
                                <Input
                                    {...register("phone")}
                                    type="text"
                                    w="full"
                                />
                            </Box>
                            <Box mt="4">
                                <FormLabel htmlFor="company" color="gray.600">
                                    Company
                                </FormLabel>
                                <Input
                                    {...register("company")}
                                    type="text"
                                    w="full"
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Box mt="4">
                                <FormLabel htmlFor="address_1" color="gray.600">
                                    Address 1
                                </FormLabel>
                                <Input
                                    {...register("address_1", {
                                        required: {
                                            value: true,
                                            message: "Address 1 is required",
                                        },
                                    })}
                                    type="text"
                                    w="full"
                                />
                                <Text color="red.500">
                                    {errors.address_1?.message}
                                </Text>
                            </Box>
                            <Box mt="4">
                                <FormLabel htmlFor="address_2" color="gray.600">
                                    Address 2
                                </FormLabel>
                                <Input
                                    {...register("address_2", {
                                        required: {
                                            value: true,
                                            message: "Address 2 is required",
                                        },
                                    })}
                                    type="text"
                                    w="full"
                                />
                                <Text color="red.500">
                                    {errors.address_2?.message}
                                </Text>
                            </Box>
                            <Box mt="4">
                                <FormLabel htmlFor="city" color="gray.600">
                                    City
                                </FormLabel>
                                <Input
                                    {...register("city", {
                                        required: {
                                            value: true,
                                            message: "City is required",
                                        },
                                    })}
                                    type="text"
                                    w="full"
                                />
                                <Text color="red.500">
                                    {errors.city?.message}
                                </Text>
                            </Box>
                            <Box mt="4">
                                <FormLabel
                                    htmlFor="postal_code"
                                    color="gray.600"
                                >
                                    Postal code
                                </FormLabel>
                                <Input
                                    {...register("postal_code", {
                                        required: {
                                            value: true,
                                            message: "Post code is required",
                                        },
                                    })}
                                    type="text"
                                    w="full"
                                />
                                <Text color="red.500">
                                    {errors.postal_code?.message}
                                </Text>
                            </Box>
                            <Box mt="4">
                                <FormLabel htmlFor="province" color="gray.600">
                                    Province
                                </FormLabel>
                                <Input
                                    {...register("province", {
                                        required: {
                                            value: true,
                                            message: "Province is required",
                                        },
                                    })}
                                    type="text"
                                    w="full"
                                />
                                <Text color="red.500">
                                    {errors.province?.message}
                                </Text>
                            </Box>
                        </Box>
                    </SimpleGrid>
                </FormControl>
                <Flex width="100%" justify="flex-end" mt="12">
                    <Button
                        isDisabled={activeStep === 0}
                        mr={4}
                        onClick={() => onPrevStep()}
                        variant="ghost"
                    >
                        Prev
                    </Button>
                    <Button type="submit" colorScheme="primary">
                        {activeStep === steps - 1 ? "Finish" : "Next"}
                    </Button>
                </Flex>
            </form>
        </>
    );
};

export default CustomerDetails;
