import { createSlice } from "@reduxjs/toolkit";

interface ICart {
    cartIsOpen: boolean;
}

const initialState: ICart = {
    cartIsOpen: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        open: (state) => {
            state.cartIsOpen = true;
        },
        close: (state) => {
            state.cartIsOpen = false;
        },
    },
});

export const { open, close } = cartSlice.actions;

export default cartSlice.reducer;
