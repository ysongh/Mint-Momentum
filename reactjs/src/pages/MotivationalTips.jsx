import React, { useState } from 'react';
import { Box, Button, Heading, Text, VStack, UnorderedList, ListItem, HStack, useToast } from '@chakra-ui/react';

const MotivationalTips = () => {
  const [isMinted, setIsMinted] = useState(false);
  const toast = useToast();

  const tips = [
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
  ];

  const handleMint = () => {
    setIsMinted(true);
  };

  const handleTip = (author) => {
    toast({
      title: "Tip Sent",
      description: `You've sent a tip to ${author}!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          MintMomentum
        </Heading>
        
        {!isMinted ? (
          <Box textAlign="center">
            <Text fontSize="lg" mb={4}>
              Unlock a world of motivation by minting your MintMomentum NFT!
            </Text>
            <Button colorScheme="blue" onClick={handleMint}>
              Mint NFT to View Tips
            </Button>
          </Box>
        ) : (
          <VStack spacing={4} align="stretch">
            <Heading as="h2" size="lg">
              Motivational Tips
            </Heading>
            <UnorderedList spacing={4}>
              {tips.map((tip, index) => (
                <ListItem key={index}>
                  <VStack align="stretch" spacing={2}>
                    <Text fontWeight="bold">"{tip.text}"</Text>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">- {tip.author}</Text>
                      <Button size="sm" colorScheme="green" onClick={() => handleTip(tip.author)}>
                        Tip Author
                      </Button>
                    </HStack>
                  </VStack>
                </ListItem>
              ))}
            </UnorderedList>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default MotivationalTips;