import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    SimpleGrid,
    RadioGroup,
    Radio,
    Flex,
    Button,
    Heading,
    Stack,
    useToast,
    Text,
    Divider,
} from "@chakra-ui/react";

import { formatSinglePrice } from "src/utils/prices";

import {
    useUpdateCartShippingMethodMutation,
    useGetCartItemsQuery,
} from "@redux/services/cart";

import { useGetCartShippingQuery } from "@redux/services/shipping";

const OrderDetails = ({ onNextStep, onPrevStep, activeStep, steps }) => {
    const {
        data: shippingData,
        isError,
        isLoading,
    } = useGetCartShippingQuery();

    const toast = useToast();

    const [updateCartShippingMethod] = useUpdateCartShippingMethodMutation();

    const handleShippingMethod = async (shipping_option_id) => {
        const response = await updateCartShippingMethod(shipping_option_id);
        if ("error" in response) {
            toast({
                title: "Error is occurred",
                isClosable: true,
                duration: 5000,
                status: "error",
            });
        } else {
            toast({
                title: "Shipping method is updated",
                isClosable: true,
                duration: 5000,
                status: "success",
            });
        }
    };
    return (
        <>
            <Box mt="12" padding="8" border="4px solid rgba(0,0,0,.1)">
                <Heading fontSize="2xl" mb="4">
                    Your order
                </Heading>
                <Divider />
                <SimpleGrid columns={2} mt="4">
                    <Text>Product</Text>
                    <Text>Total</Text>
                </SimpleGrid>
                <Divider />
                <SimpleGrid columns={2} mt="4">
                    <Text>T-Shirt</Text>
                    <Text>250</Text>
                </SimpleGrid>
                <Divider />
                <SimpleGrid columns={2} mt="4">
                    <Text>Shipping</Text>
                    <RadioGroup
                        defaultValue="1"
                        onChange={(e) => handleShippingMethod(e)}
                    >
                        <Stack>
                            {shippingData?.shipping_options.map((option) => (
                                <Radio key={option.id} value={option.id}>
                                    {option.name +
                                        " : " +
                                        formatSinglePrice(option.amount)}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                </SimpleGrid>
                <Divider />
                <SimpleGrid columns={2} mt="4">
                    <Text>Order total</Text>
                    <Text color="primary.500" fontWeight="bold">
                        250
                    </Text>
                </SimpleGrid>
                <Divider />
            </Box>
            <Flex width="100%" justify="flex-end" mt="12">
                <Button
                    isDisabled={activeStep === 0}
                    mr={4}
                    onClick={() => onPrevStep()}
                    variant="ghost"
                >
                    Prev
                </Button>
                <Button colorScheme="primary" onClick={() => onNextStep()}>
                    {activeStep === steps - 1 ? "Finish" : "Next"}
                </Button>
            </Flex>
        </>
    );
};

export default OrderDetails;
