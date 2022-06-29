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
    useMediaQuery,
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
import { open, close } from "@redux/actions";
import { useAppDispatch } from "@redux/store";

import NextLink from "next/link";

import {
    MdOutlineSearch,
    MdOutlinePersonOutline,
    MdOutlineShoppingCart,
    MdOutlineMenu,
} from "react-icons/md";

interface DesktopNavProps {
    isHomePage?: boolean;
}

const DesktopNav: FC<DesktopNavProps> = ({ isHomePage }) => {
    return (
        <Box
            as="nav"
            fontWeight="500"
            fontSize="sm"
            color={isHomePage ? "white" : "gray.800"}
        >
            <Link
                as={NextLink}
                href="/"
                p="4"
                _hover={{ color: "primary.500" }}
            >
                Home
            </Link>
            <Link p="4" _hover={{ color: "primary.500" }}>
                Shop
            </Link>
            <Link
                as={NextLink}
                href="/product/1"
                p="4"
                _hover={{ color: "primary.500" }}
            >
                Product
            </Link>
            <Link p="4" _hover={{ color: "primary.500" }}>
                About us
            </Link>
            <Link p="4" _hover={{ color: "primary.500" }}>
                Contact
            </Link>
        </Box>
    );
};

const MobileNav = () => {
    return (
        <VStack as="nav" fontWeight="500" fontSize="sm">
            <Link p="4" _hover={{ color: "primary.500" }}>
                Home
            </Link>
            <Link p="4" _hover={{ color: "primary.500" }}>
                Shop
            </Link>
            <Link p="4" _hover={{ color: "primary.500" }}>
                About us
            </Link>
            <Link p="4" _hover={{ color: "primary.500" }}>
                Contact
            </Link>
            <Button>Search</Button>
        </VStack>
    );
};

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
            {/* Mobile screen */}
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

const HeaderDrawer = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
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
                    <MobileNav />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

const TallHeader = ({ onOpen }) => {
    const router = useRouter();

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
                            <DesktopNav isHomePage={isHomePage} />
                        </Box>
                    </HStack>
                    <MenuIcons onOpen={onOpen} />
                </Stack>
            </Container>
        </Box>
    );
};

const SmallHeader = ({ onOpen, isScrolled }) => {
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
                            <DesktopNav />
                        </Box>
                    </HStack>
                    <MenuIcons onOpen={onOpen} />
                </Stack>
            </Container>
        </Box>
    );
};

interface HeaderProps {
    position?: "absolute" | "inherit" | "fixed";
    logoIsDark?: boolean;
    textColor?: string;
}

const Header: FC<HeaderProps> = () => {
    const menu = [
        { id: 1, name: "Home", link: "/" },
        { id: 2, name: "Shop", link: "/shop" },
        { id: 3, name: "Product", link: "/product/1" },
        { id: 4, name: "About us", link: "/about-us" },
        { id: 5, name: "Contact", link: "/contact" },
    ];

    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    console.log("🚀 ~ file: Header.tsx ~ line 270 ~ isScrolled", isScrolled);

    /* Show or hide drawer with mobile navigation */
    const { isOpen, onOpen, onClose } = useDisclosure();

    /* Use for decide if header navigation for mobile or desktop use */
    const [isDesktop] = useMediaQuery("(min-width: 996px)");

    const handleScroll = () => {
        const position = window.pageYOffset;
        console.log(
            "🚀 ~ file: Header.tsx ~ line 279 ~ handleScroll ~ position",
            position,
        );
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
            <TallHeader onOpen={onOpen} />
            {isScrolled && (
                <SmallHeader isScrolled={isScrolled} onOpen={onOpen} />
            )}

            <HeaderDrawer isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default Header;
