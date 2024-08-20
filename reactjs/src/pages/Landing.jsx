import React from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react';

const Feature = ({ icon, title, text }) => {
  return (
    <VStack>
      <Icon as={icon} w={10} h={10} color="blue.500" />
      <Text fontWeight="bold">{title}</Text>
      <Text textAlign="center">{text}</Text>
    </VStack>
  );
};

const Landing = () => {
  return (
    <Box>
      <Container maxW="container.xl" py={20}>
        <VStack spacing={10}>
          {/* Hero Section */}
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={4}>
              Welcome to MintMomentum
            </Heading>
            <Text fontSize="xl" mb={8}>
              Inspire, Motivate, and Earn on the Blockchain
            </Text>
            <Button size="lg" colorScheme="blue">
              Get Started
            </Button>
          </Box>

          {/* Feature Section */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            <Feature
              title="Share Inspiration"
              text="Post your motivational tips and inspire others"
            />
            <Feature
              title="Earn Rewards"
              text="Receive cryptocurrency tips for your contributions"
            />
            <Feature
              title="Join Community"
              text="Connect with like-minded individuals"
            />
            <Feature
              title="Track Impact"
              text="See how your tips are motivating others"
            />
          </SimpleGrid>

          {/* How It Works Section */}
          <Box>
            <Heading as="h2" size="xl" mb={8} textAlign="center">
              How It Works
            </Heading>
            <HStack spacing={8} align="start">
              <VStack flex={1}>
                <Text fontWeight="bold">1. Create Your Account</Text>
                <Text>Sign up and connect your wallet</Text>
              </VStack>
              <VStack flex={1}>
                <Text fontWeight="bold">2. Share Motivation</Text>
                <Text>Post your inspirational tips and quotes</Text>
              </VStack>
              <VStack flex={1}>
                <Text fontWeight="bold">3. Engage & Earn</Text>
                <Text>Interact with others and receive tips</Text>
              </VStack>
            </HStack>
          </Box>

          {/* Call to Action */}
          <Box textAlign="center" py={10}>
            <Heading as="h2" size="xl" mb={4}>
              Ready to Start Your Journey?
            </Heading>
            <Button size="lg" colorScheme="blue">
              Join MintMomentum Now
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Landing;