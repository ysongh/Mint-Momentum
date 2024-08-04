import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Text, VStack, UnorderedList, ListItem, HStack, useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';

import Momentum from '../artifacts/contracts/Momentum.sol/Momentum.json';

const MotivationalTips = ({ userSigner }) => {
  const [isMinted, setIsMinted] = useState(false);
  const [tips, setTips] = useState([]);
  const [contract, setContract] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (userSigner) loadContract(userSigner);
  }, [userSigner])

  useEffect(() => {
    if (contract) loadTips();
  }, [contract])

  const loadContract = (userSigner) => {
    const newContract = new ethers.Contract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", Momentum.abi, userSigner);
    setContract(newContract);
  }

  const loadTips = async () => {
    const newTips = await contract.getMotivationalTips();
    setTips(newTips);
    console.log(newTips);
  }

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
                      <Text fontSize="sm" color="gray.600">- {tip.owner}</Text>
                      <Button size="sm" colorScheme="green" onClick={() => handleTip(tip.owner)}>
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