import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cart } from "@medusajs/medusa";

type CartResponse = {
    cart: Cart;
};

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/store/carts" }),
    tagTypes: ["CartItems"],
    endpoints: (builder) => ({
        getCartItems: builder.query<CartResponse, string>({
            query: () => localStorage.getItem("cart-id"),
            providesTags: ["CartItems"],
        }),
        addItemToCart: builder.mutation<void, any>({
            query: ({ ...data }) => ({
                url: `/${localStorage.getItem("cart-id")}/line-items`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["CartItems"],
        }),
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
        deleteCartItem: builder.mutation<void, string>({
            query: (line_id) => ({
                url: `/${localStorage.getItem(
                    "cart-id",
                )}/line-items/${line_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["CartItems"],
        }),
    }),
});

export const {
    useGetCartItemsQuery,
    useAddItemToCartMutation,
    useUpdateItemQuantityMutation,
    useDeleteCartItemMutation,
} = cartApi;
