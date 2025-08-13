import { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import {
  Container,
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  Link,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { ethers } from 'ethers';

function Navbar({ ethAddress, setETHAddress, setUserSigner }) {
  const [isOpen, setIsOpen] = useState(false);

  const connectMetamask = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setETHAddress(accounts[0]);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setUserSigner(signer);
    } catch (error) {
      console.error('MetaMask connection failed:', error);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Determine when to show hamburger menu vs. full links
  const displayLinks = useBreakpointValue({ base: 'none', md: 'flex' });
  const displayHamburger = useBreakpointValue({ base: 'flex', md: 'none' });

  return (
    <Box p={2} bg="white" boxShadow="sm">
      <Container maxW="1100px">
        <Flex alignItems="center" gap="2">
          {/* Logo */}
          <Box mr="4">
            <Link as={ReactLink} to="/">
              <Heading color="green" size="lg" mt="3" mb="3">
                Mint Momentum
              </Heading>
            </Link>
          </Box>

          {/* Spacer to push content to the right */}
          <Spacer />

          {/* Navigation Links for Desktop */}
          <Flex gap="4" alignItems="center" display={displayLinks}>
            <Link
              as={ReactLink}
              to="/"
              fontWeight="medium"
              _hover={{ color: 'green.500', textDecoration: 'none' }}
            >
              Home
            </Link>
            <Link
              as={ReactLink}
              to="/motivationaltips"
              fontWeight="medium"
              _hover={{ color: 'green.500', textDecoration: 'none' }}
            >
              Motivational Tips
            </Link>
            <Link
              as={ReactLink}
              to="/create-tipform"
              fontWeight="medium"
              _hover={{ color: 'green.500', textDecoration: 'none' }}
            >
              Create Tip Form
            </Link>
            <Link
              as={ReactLink}
              to="/askai"
              fontWeight="medium"
              _hover={{ color: 'green.500', textDecoration: 'none' }}
            >
              Ask AI
            </Link>
            <Button
              onClick={connectMetamask}
              colorScheme="green"
              size="sm"
              variant={ethAddress ? 'outline' : 'solid'}
            >
              {ethAddress
                ? `${ethAddress.slice(0, 5)}...${ethAddress.slice(37, 42)}`
                : 'Connect Wallet'}
            </Button>
          </Flex>

          {/* Hamburger Icon for Mobile */}
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            display={displayHamburger}
            onClick={toggleMenu}
            colorScheme="green"
            variant="outline"
            size="md"
          />
        </Flex>

        {/* Drawer for Mobile Menu */}
        <Drawer isOpen={isOpen} placement="right" onClose={closeMenu}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody pt="12">
              <VStack spacing="4" align="start">
                <Link
                  as={ReactLink}
                  to="/"
                  onClick={closeMenu}
                  fontWeight="medium"
                  fontSize="lg"
                  _hover={{ color: 'green.500', textDecoration: 'none' }}
                >
                  Home
                </Link>
                <Link
                  as={ReactLink}
                  to="/motivationaltips"
                  onClick={closeMenu}
                  fontWeight="medium"
                  fontSize="lg"
                  _hover={{ color: 'green.500', textDecoration: 'none' }}
                >
                  Motivational Tips
                </Link>
                <Link
                  as={ReactLink}
                  to="/create-tipform"
                  onClick={closeMenu}
                  fontWeight="medium"
                  fontSize="lg"
                  _hover={{ color: 'green.500', textDecoration: 'none' }}
                >
                  Create Tip Form
                </Link>
                <Link
                  as={ReactLink}
                  to="/askai"
                  onClick={closeMenu}
                  fontWeight="medium"
                  fontSize="lg"
                  _hover={{ color: 'green.500', textDecoration: 'none' }}
                >
                  Ask AI
                </Link>
                <Button
                  onClick={connectMetamask}
                  colorScheme="green"
                  size="md"
                  width="full"
                  mt="2"
                >
                  {ethAddress
                    ? `${ethAddress.slice(0, 5)}...${ethAddress.slice(37, 42)}`
                    : 'Connect Wallet'}
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Container>
    </Box>
  );
}

export default Navbar;
