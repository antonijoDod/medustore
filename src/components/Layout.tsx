import { Box } from "@chakra-ui/react";
import React, { FC } from "react";
import { Header, Footer } from "@components";

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
    return (
        <>
            <Header
                position={headerPosition}
                logoIsDark={logoIsDark}
                textColor={headerTextColor}
            />
            <Box as="main">{children}</Box>
            <Footer />
        </>
    );
};

export default Layout;
