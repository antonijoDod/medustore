import React from "react";
import { Box, useRadio } from "@chakra-ui/react";

const RadioCard = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                color="white"
                backgroundColor={input.value}
                _checked={{
                    borderColor: "black",
                }}
                _focus={{
                    boxShadow: "outline",
                }}
                px={5}
                py={5}
            >
                {props.children}
            </Box>
        </Box>
    );
};

export default RadioCard;
