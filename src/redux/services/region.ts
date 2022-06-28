// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Region } from "@medusajs/medusa";

type RegionsResponse = {
    regions: Region[];
};

type RegionResponse = {
    region: { Region };
};

const BACKEND_URL =
    process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000";

// Define a service using a base URL and expected endpoints
export const regionApi = createApi({
    reducerPath: "regionApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/store` }),
    endpoints: (builder) => ({
        getAllRegions: builder.query<RegionsResponse, string>({
            query: () => `regions`,
        }),
        getSingleRegion: builder.query<RegionResponse, string>({
            query: (id) => `regions/${id}`,
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllRegionsQuery, useGetSingleRegionQuery } = regionApi;
