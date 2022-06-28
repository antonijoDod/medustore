import React, { FC } from "react";
import Image from "next/image";
import {
    HStack,
    Box,
    Heading,
    useToast,
    IconButton,
    Button,
} from "@chakra-ui/react";
import { MdOutlineDelete, MdOutlineRemove, MdOutlineAdd } from "react-icons/md";
import { LineItem } from "@medusajs/medusa";

import { formatSinglePrice } from "src/utils/prices";
import {
    useDeleteCartItemMutation,
    useUpdateItemQuantityMutation,
} from "@redux/services/cart";

interface CartItemInterface {
    data: LineItem;
}

const CartItem: FC<CartItemInterface> = ({ data }) => {
    const toast = useToast();

    const [deleteCartItem] = useDeleteCartItemMutation();
    const [updateItemQuantity] = useUpdateItemQuantityMutation();

    const handleAddItemByOne = async () => {
        await updateItemQuantity({ id: data.id, quantity: data.quantity + 1 });
    };

    const handleRemoveItemByOne = async () => {
        await updateItemQuantity({ id: data.id, quantity: data.quantity - 1 });
    };

    // Delete item from cart
    const handleDeleteCartItem = async (id) => {
        const result = await deleteCartItem(id);
        if ("error" in result) {
            toast({
                title: "Something is wrong",
                status: "warning",
                isClosable: true,
                duration: 5000,
            });
        } else {
            toast({
                title: "Item is removed",
                status: "success",
                isClosable: true,
                duration: 5000,
            });
        }
    };

    return (
        <HStack justifyContent="space-between" py="4">
            <HStack>
                <Image
                    src={
                        data.thumbnail
                            ? data.thumbnail
                            : "/assets/images/placeholder_300x300.png"
                    }
                    height="75"
                    width="75"
                />
                <Box>
                    <Heading fontSize="md">{data.title}</Heading>
                    <Box>Variant: {data.variant.title}</Box>
                    <HStack>
                        <Box mr="4">
                            <IconButton
                                icon={<MdOutlineRemove />}
                                size="sm"
                                aria-label="Remove item by one"
                                onClick={handleRemoveItemByOne}
                            />
                            <Box as="span" px="2">
                                {data.quantity}
                            </Box>
                            <IconButton
                                icon={<MdOutlineAdd />}
                                size="sm"
                                aria-label="Add item by one"
                                onClick={handleAddItemByOne}
                            />
                        </Box>
                        <Box>{formatSinglePrice(data.unit_price)}</Box>
                    </HStack>
                </Box>
            </HStack>
            <IconButton
                icon={<MdOutlineDelete />}
                aria-label="Delete item"
                onClick={() => handleDeleteCartItem(data.id)}
            />
        </HStack>
    );
};

export default CartItem;
