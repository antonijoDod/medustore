import React from "react";
import NextLink from "next/link";
import { useSelector } from "react-redux";
import {
    Drawer,
    DrawerContent,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerFooter,
    DrawerBody,
    useDisclosure,
    Button,
    Text,
    Divider,
} from "@chakra-ui/react";
import { CartItem } from "@components";

import { RootState } from "@redux/reducers";
import { useAppDispatch } from "@redux/store";
import { open, close } from "@redux/actions";
import { useGetCartItemsQuery } from "@redux/services/cart";
import { formatSinglePrice } from "../utils/prices";

const Cart = () => {
    const { onClose } = useDisclosure();
    const dispatch = useAppDispatch();

    const { data, error, isLoading } = useGetCartItemsQuery("none");

    const cartIsOpen = useSelector(
        (state: RootState) => state.rootReducer.cart.cartIsOpen,
    );

    return (
        <Drawer
            isOpen={cartIsOpen}
            size="md"
            placement="right"
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton onClick={() => dispatch(close())} />
                <DrawerHeader>Your cart</DrawerHeader>

                <DrawerBody>
                    {error ? (
                        <Text>Oh no, there was an error</Text>
                    ) : isLoading ? (
                        <>Loading</>
                    ) : data ? (
                        <>
                            {data.cart.items.map((item) => (
                                <CartItem key={item.id} data={item} />
                            ))}
                            <Divider my="4" />
                            <Text fontSize="2xl">
                                Total: {formatSinglePrice(data.cart.total)}
                            </Text>
                        </>
                    ) : null}
                </DrawerBody>

                <DrawerFooter>
                    <Button
                        variant="outline"
                        mr={3}
                        onClick={() => dispatch(close())}
                    >
                        Continue shopping
                    </Button>
                    <NextLink href="/checkout">
                        <Button
                            colorScheme="primary"
                            onClick={() => dispatch(close())}
                        >
                            Checkout
                        </Button>
                    </NextLink>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default Cart;
