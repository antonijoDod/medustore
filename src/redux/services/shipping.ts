import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ShippingOption } from "@medusajs/medusa";

const BACKEND_URL =
    process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000";

type TShippingOption = {
    shipping_options: ShippingOption[];
};

export const shippingApi = createApi({
    reducerPath: "shippingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/store/shipping-options`,
    }),
    endpoints: (builder) => ({
        getCartShipping: builder.query<TShippingOption, string>({
            query: (name) => localStorage.getItem("cart-id"),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCartShippingQuery } = shippingApi;
