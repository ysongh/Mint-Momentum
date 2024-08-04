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

const CreateTipForm = () => {
  const [tip, setTip] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting tip:', { tip });
    
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