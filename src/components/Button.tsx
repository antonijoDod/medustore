import React from "react";
import { Button as BaseButton, ButtonProps } from "@chakra-ui/react";

type IButton = ButtonProps;

const Button: React.FC<IButton> = ({ ...rest }) => {
    return (
        <BaseButton
            colorScheme="primary"
            rounded="none"
            fontWeight="400"
            letterSpacing="2px"
            {...rest}
        />
    );
};

export default Button;
