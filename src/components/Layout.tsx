import React, { FC, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Header, Footer, Cart } from "@components";
import { initNewCart } from "src/utils/cart";

interface Props {
    children: React.ReactNode;
    headerPosition?: "absolute" | "inherit";
    logoIsDark?: boolean;
    headerTextColor?: string | undefined;
}

const Layout: FC<Props> = ({
    headerPosition,
    headerTextColor,
    logoIsDark,
    children,
}) => {
    useEffect(() => {
        initNewCart();
    }, []);

    return (
        <>
            <Header
                position={headerPosition}
                logoIsDark={logoIsDark}
                textColor={headerTextColor}
            />
            <Box as="main">{children}</Box>
            <Cart />
            <Footer />
        </>
    );
};

export default Layout;
