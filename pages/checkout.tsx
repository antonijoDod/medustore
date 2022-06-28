import React, { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import {
    Layout,
    CustomerDetails,
    OrderDetails,
    PaymentDetails,
} from "@components";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import {
    Box,
    Container,
    Heading,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
} from "@chakra-ui/react";

import {
    useGetAllRegionsQuery,
    useGetSingleRegionQuery,
} from "@redux/services/region";

import {
    useGetCartItemsQuery,
    useUpdateCartMutation,
} from "@redux/services/cart";

import { useGetCartShippingQuery } from "@redux/services/shipping";
import { formatSinglePrice } from "src/utils/prices";

const Checkout = () => {
    const { nextStep, prevStep, activeStep } = useSteps({
        initialStep: 0,
    });

    const steps = 3;

    return (
        <Layout logoIsDark>
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
                        <Heading mb="4">Checkout</Heading>
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
                                    Checkout
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Box>
                </Container>
            </Box>

            {/* Steps section */}
            <Container as="section" maxW="container.xl" py="20">
                <Flex flexDir="column" width="100%">
                    <Steps activeStep={activeStep}>
                        <Step label="Customer details">
                            <CustomerDetails
                                onNextStep={nextStep}
                                onPrevStep={prevStep}
                                activeStep={activeStep}
                                steps={steps}
                            />
                        </Step>
                        <Step label="Order details and shipping">
                            <OrderDetails
                                onNextStep={nextStep}
                                onPrevStep={prevStep}
                                activeStep={activeStep}
                                steps={steps}
                            />
                        </Step>
                        <Step label="Payment details">
                            <PaymentDetails
                                onNextStep={nextStep}
                                onPrevStep={prevStep}
                                activeStep={activeStep}
                                steps={steps}
                            />
                        </Step>
                        <Step label="Finish">
                            <h1>Finish step</h1>
                        </Step>
                    </Steps>
                    {/*   {activeStep === steps ? (
                        <Flex p={4}>
                            <Button mx="auto" size="sm" onClick={reset}>
                                Reset
                            </Button>
                        </Flex>
                    ) : (
                        <Flex width="100%" justify="flex-end" mt="12">
                            <Button
                                isDisabled={activeStep === 0}
                                mr={4}
                                onClick={prevStep}
                                variant="ghost"
                            >
                                Prev
                            </Button>
                            <Button colorScheme="primary" onClick={nextStep}>
                                {activeStep === steps - 1 ? "Finish" : "Next"}
                            </Button>
                        </Flex>
                    )} */}
                </Flex>
            </Container>
        </Layout>
    );
};

export default Checkout;
