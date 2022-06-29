import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
    useGetCartItemsQuery,
    useInitializeThePaymentSessionMutation,
    useSetPaymentSessionMutation,
} from "@redux/services/cart";

import { Button, Heading } from "@chakra-ui/react";

const PaymentDetails = ({ onNextStep, onPrevStep, activeStep, steps }) => {
    const router = useRouter();

    const [
        initializeThePaymentSession,
        { isError: initializeThePaymentSessionError },
    ] = useInitializeThePaymentSessionMutation();

    const [setPaymentSession] = useSetPaymentSessionMutation();

    const {
        data: cartData,
        isError: isErrorCart,
        isLoading: isLoadingCart,
    } = useGetCartItemsQuery();

    useEffect(() => {
        initializeThePaymentSession();
    }, []);

    const handlePayment = async () => {
        await setPaymentSession("manual");
        router.push(`/`);
    };

    if (initializeThePaymentSessionError) {
        return <Heading>Initialize the payment session occurred</Heading>;
    }

    return (
        <div>
            <Button onClick={handlePayment}>Pay on delivery</Button>
        </div>
    );
};

export default PaymentDetails;
