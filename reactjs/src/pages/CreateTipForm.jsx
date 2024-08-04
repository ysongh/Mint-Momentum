import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import { ethers } from 'ethers';

import Momentum from '../artifacts/contracts/Momentum.sol/Momentum.json';

const CreateTipForm = ({ userSigner }) => {
  const [tip, setTip] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting tip:', { tip });

    const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Momentum.abi, userSigner);

    const transaction = await contract.createMotivationalTip(tip);
    const tx = await transaction.wait();
    console.log(tx);
    
    // Show a success message
    toast({
      title: "Tip Created",
      description: "Your motivational tip has been submitted successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Clear the form
    setTip('');
  };

  return (
    <Box maxWidth="500px" margin="auto" padding={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Create a Motivational Tip
        </Heading>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Motivational Tip</FormLabel>
              <Textarea
                value={tip}
                onChange={(e) => setTip(e.target.value)}
                placeholder="Enter your motivational tip here"
                size="md"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full">
              Submit Tip
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default CreateTipForm;