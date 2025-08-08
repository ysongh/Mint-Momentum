import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Text, VStack, UnorderedList, ListItem, HStack, useToast } from '@chakra-ui/react';
import { ethers } from 'ethers';

import Momentum from '../artifacts/contracts/Momentum.sol/Momentum.json';
import SimpleNFT from '../artifacts/contracts/SimpleNFT.sol/SimpleNFT.json';

const MotivationalTips = ({ ethAddress, userSigner }) => {
  const [isMinted, setIsMinted] = useState(false);
  const [tips, setTips] = useState([]);
  const [contract, setContract] = useState(null);
  const [aiData, setaiData] = useState(null);
  const [aiLoading, setaiLoading] = useState(false);
  const [nftcontract, setNFTContract] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (userSigner) loadContract(userSigner);
  }, [userSigner])

  useEffect(() => {
    if (contract) loadTips();
  }, [contract])

  useEffect(() => {
    if (contract) hasNFT();
  }, [contract])

  const loadContract = (userSigner) => {
    const newContract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS1, Momentum.abi, userSigner);
    const nftcontract = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS2, SimpleNFT.abi, userSigner);
    setContract(newContract);
    setNFTContract(nftcontract);
  }

  const loadTips = async () => {
    const newTips = await contract.getMotivationalTips();
    setTips(newTips);
    console.log(newTips);
  }

  const hasNFT = async () => {
    console.log(nftcontract)
    const amount = await nftcontract.nftBalance();
    console.log(amount);

    setIsMinted(true);
  };

  const handleMint = async () => {
    const transaction = await nftcontract.mint(ethAddress);
    const tx = await transaction.wait();
    console.log(tx);

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

  const askAI = async () => {
    try {
      setaiLoading(true);

      const response = await fetch(`${import.meta.env.VITE_SERVERURL}/test`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch balance');
      }
      
      console.log(result.data);
      setaiData(result.data);
    } catch (err) {
      console.error(err.message);
    } finally {
       setaiLoading(false);
    }
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Mint Momentum
        </Heading>

        <Button isLoading={aiLoading} size="sm" colorScheme="green" onClick={askAI}>
          Ask AI
        </Button>

        <Text fontSize="lg" mb={4}>
          {aiData}
        </Text>
        
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