import React from "react";
import { Box, useRadio } from "@chakra-ui/react";

const RadioCard = (props) => {
    const { getInputProps, getCheckboxProps, state } = useRadio(props);

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
                backgroundColor={state.isChecked ? "primary.500" : "gray.500"}
                _checked={{
                    borderColor: "black",
                }}
                _focus={{
                    boxShadow: "outline",
                }}
                px="4"
                py="2"
            >
                {props.title}
            </Box>
        </Box>
    );
};

export default RadioCard;
