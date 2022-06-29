import React, { useState, useEffect, FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
    Box,
    Container,
    HStack,
    IconButton,
    Link,
    Stack,
    Drawer,
    DrawerOverlay,
    DrawerBody,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    useDisclosure,
    Button,
    VStack,
    Text,
} from "@chakra-ui/react";
import { open } from "@redux/actions";
import { useAppDispatch } from "@redux/store";

import NextLink from "next/link";

import {
    MdOutlinePersonOutline,
    MdOutlineShoppingCart,
    MdOutlineMenu,
} from "react-icons/md";

type TMenu = {
    id: number;
    name: string;
    link: string;
};

interface DesktopNavProps {
    isHomePage?: boolean;
    menu: TMenu[];
}

// Desktop menu
const DesktopNav: FC<DesktopNavProps> = ({ isHomePage, menu }) => {
    const router = useRouter();
    return (
        <HStack
            as="nav"
            fontWeight="500"
            fontSize="sm"
            color={isHomePage ? "white" : "gray.600"}
        >
            {menu.map((item) => (
                <NextLink key={item.id} href={item.link}>
                    <Link
                        p="2"
                        _hover={{ color: "primary.500" }}
                        color={
                            router.pathname === item.link ? "primary.500" : ""
                        }
                    >
                        {item.name}
                    </Link>
                </NextLink>
            ))}
        </HStack>
    );
};

// Mobile menu
const MobileNav: FC<{ menu: TMenu[] }> = ({ menu }) => {
    const router = useRouter();
    return (
        <VStack as="nav" fontWeight="500" fontSize="sm">
            {menu.map((item) => (
                <NextLink key={item.id} href={item.link}>
                    <Link
                        p="2"
                        _hover={{ color: "primary.500" }}
                        color={
                            router.pathname === item.link ? "primary.500" : ""
                        }
                    >
                        {item.name}
                    </Link>
                </NextLink>
            ))}

            <Button>Search</Button>
        </VStack>
    );
};

// Action icons in header
const MenuIcons = ({ onOpen }: { onOpen: () => void }) => {
    const dispatch = useAppDispatch();
    return (
        <HStack>
            <HStack display={{ base: "none", lg: "block" }}>
                <IconButton
                    icon={<MdOutlinePersonOutline />}
                    aria-label="search"
                    isRound
                    color="primary.500"
                    bg="primary.100"
                    size="lg"
                    fontSize="larger"
                    _hover={{
                        bg: "primary.500",
                        color: "primary.100",
                    }}
                />
                <IconButton
                    icon={<MdOutlineShoppingCart />}
                    aria-label="mobile cart"
                    onClick={() => dispatch(open())}
                    isRound
                    color="primary.500"
                    bg="primary.100"
                    size="lg"
                    fontSize="larger"
                    _hover={{
                        bg: "primary.500",
                        color: "primary.100",
                    }}
                />
            </HStack>
            <HStack display={{ base: "block", lg: "none" }}>
                <IconButton
                    icon={<MdOutlineShoppingCart />}
                    aria-label="mobile cart"
                    isRound
                    onClick={() => dispatch(open())}
                    color="primary.500"
                    bg="primary.100"
                    size="lg"
                    fontSize="larger"
                    _hover={{
                        bg: "primary.500",
                        color: "primary.100",
                    }}
                />
                <IconButton
                    icon={<MdOutlineMenu />}
                    onClick={() => onOpen()}
                    aria-label="mobile menu"
                    isRound
                    color="primary.500"
                    bg="primary.100"
                    size="lg"
                    fontSize="larger"
                    _hover={{
                        bg: "primary.500",
                        color: "primary.100",
                    }}
                />
            </HStack>
        </HStack>
    );
};

// Aside drawer with navigation menu
const HeaderDrawer = ({
    isOpen,
    onClose,
    menu,
}: {
    isOpen: boolean;
    onClose: () => void;
    menu: TMenu[];
}) => {
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    <Text>Menu</Text>
                </DrawerHeader>

                <DrawerBody>
                    <MobileNav menu={menu} />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

interface IHeader {
    onOpen: () => void;
    menu: TMenu[];
}

// First header when page is loaded
const TallHeader: FC<IHeader> = ({ onOpen, menu }) => {
    const router = useRouter();

    // If is front page change styling for header
    const isHomePage = router.route === "/" ? true : false;

    return (
        <Box
            w="full"
            display="flex"
            h="136"
            zIndex={999}
            position={isHomePage ? "absolute" : "inherit"}
        >
            <Container maxW="container.xl">
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    h="full"
                >
                    <HStack textTransform="uppercase">
                        <Box mr="4">
                            {isHomePage ? (
                                <Image
                                    src="/assets/svg/logo-white.svg"
                                    layout="fixed"
                                    height="36"
                                    width="174"
                                    alt="White logo"
                                />
                            ) : (
                                <Image
                                    src="/assets/svg/logo-black.svg"
                                    layout="fixed"
                                    height="36"
                                    width="174"
                                    alt="White logo"
                                />
                            )}
                        </Box>
                        <Box display={{ base: "none", lg: "block" }}>
                            <DesktopNav isHomePage={isHomePage} menu={menu} />
                        </Box>
                    </HStack>
                    <MenuIcons onOpen={onOpen} />
                </Stack>
            </Container>
        </Box>
    );
};

// Shrinked header when ise scroll for 136px
const SmallHeader: FC<IHeader> = ({ onOpen, menu }) => {
    return (
        <Box
            w="full"
            display="flex"
            boxShadow="0 0 15px rgb(0 0 0 / 10%)"
            h="80px"
            position="fixed"
            zIndex="999"
            bg="whiteAlpha.900"
            top="0"
        >
            <Container maxW="container.xl">
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    h="full"
                >
                    <HStack textTransform="uppercase">
                        <Box mr="4">
                            <Image
                                src="/assets/svg/logo-black.svg"
                                layout="fixed"
                                height="36"
                                width="174"
                                alt="White logo"
                            />
                        </Box>
                        <Box display={{ base: "none", lg: "block" }}>
                            <DesktopNav menu={menu} />
                        </Box>
                    </HStack>
                    <MenuIcons onOpen={onOpen} />
                </Stack>
            </Container>
        </Box>
    );
};

// Main Header comonent
const Header: FC = () => {
    const menu = [
        { id: 1, name: "Home", link: "/" },
        { id: 2, name: "Shop", link: "/shop" },
        { id: 3, name: "About us", link: "/about-us" },
        { id: 4, name: "Contact", link: "/contact" },
    ];

    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    /* Show or hide drawer with mobile navigation */
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleScroll = () => {
        const position = window.pageYOffset;
        if (position > 136) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <TallHeader onOpen={onOpen} menu={menu} />
            {isScrolled && <SmallHeader onOpen={onOpen} menu={menu} />}

            <HeaderDrawer isOpen={isOpen} onClose={onClose} menu={menu} />
        </>
    );
};

export default Header;
