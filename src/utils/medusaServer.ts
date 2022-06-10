import axios from "axios";

const BACKEND_URL =
    process.env.NEXT_PUBLIC_MEDUSA_URL || "http://localhost:9000";

export const medusaServer = axios.create({
    baseURL: `${BACKEND_URL}/store`,
});
