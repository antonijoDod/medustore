import { ThemeOverride } from "@chakra-ui/react";

type GlobalStyles = Pick<ThemeOverride, "styles">;

export default {
    styles: {
        global: {
            body: {
                lineHeight: "1.8",
            },
            h1: {
                fontWeight: 500,
                marginBottom: "0.5em",
            },
            p: {
                marginBottom: "1em",
            },
        },
    },
} as GlobalStyles;
