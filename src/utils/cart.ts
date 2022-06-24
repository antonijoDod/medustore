import { medusaServer } from "src/utils/medusaServer";

export const initNewCart = async () => {
    const cartInStorage = localStorage.getItem("cart-id");

    if (cartInStorage === undefined || cartInStorage === null) {
        const response = await medusaServer.post("/carts");

        const { cart } = await response.data;

        if (cart !== "undefined") {
            localStorage.setItem("cart-id", cart.id);
        }
    }
};
