import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cart } from "@medusajs/medusa";

const BACKEND_URL =
    process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000";

type CartResponse = {
    cart: Cart;
};

type TPaymentSession = {
    payment_session_id: string;
    payment_provider_id: string;
};

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/store/carts` }),
    tagTypes: ["CartItems"],
    endpoints: (builder) => ({
        // Get all cart info and  all items in cart
        getCartItems: builder.query<CartResponse, string>({
            query: () => localStorage.getItem("cart-id"),
            providesTags: ["CartItems"],
        }),
        // Add new item to cart
        addItemToCart: builder.mutation<void, any>({
            query: ({ ...data }) => ({
                url: `/${localStorage.getItem("cart-id")}/line-items`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["CartItems"],
        }),
        // Sent shipping address and create customer id - email
        updateCart: builder.mutation<void, any>({
            query: ({ ...data }) => ({
                url: localStorage.getItem("cart-id"),
                method: "POST",
                body: data,
            }),
        }),
        // Update item quantity in cart
        updateItemQuantity: builder.mutation<void, any>({
            query: ({ id, quantity }) => ({
                url: `/${localStorage.getItem("cart-id")}/line-items/${id}`,
                method: "POST",
                body: {
                    quantity,
                },
            }),
            invalidatesTags: ["CartItems"],
        }),
        // Delete item from cart
        deleteCartItem: builder.mutation<void, string>({
            query: (line_id) => ({
                url: `/${localStorage.getItem(
                    "cart-id",
                )}/line-items/${line_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CartItems"],
        }),
        // Choose shipping method and save to cart
        updateCartShippingMethod: builder.mutation<void, string>({
            query: (shipping_option_id) => ({
                url: `${localStorage.getItem("cart-id")}/shipping-methods`,
                method: "POST",
                body: {
                    option_id: shipping_option_id,
                },
            }),
        }),
        // Initialize the payment sessions
        initializeThePaymentSession: builder.mutation<void, null>({
            query: () => ({
                url: `${localStorage.getItem("cart-id")}/payment-sessions`,
                method: "POST",
            }),
        }),
        // Set payment session - provider
        setPaymentSession: builder.mutation<void, string>({
            query: (payment_provider_id) => ({
                url: `${localStorage.getItem("cart-id")}/payment-sessions`,
                method: "POST",
                body: {
                    data: {
                        provider_id: payment_provider_id,
                    },
                },
            }),
        }),
    }),
});

export const {
    useGetCartItemsQuery,
    useUpdateCartMutation,
    useAddItemToCartMutation,
    useUpdateItemQuantityMutation,
    useDeleteCartItemMutation,
    useUpdateCartShippingMethodMutation,
    useInitializeThePaymentSessionMutation,
    useSetPaymentSessionMutation,
} = cartApi;
