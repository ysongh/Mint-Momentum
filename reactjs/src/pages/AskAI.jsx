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

const AskAI = () => {
  const [msg, setmsg] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting tip:', { msg });
  };

  return (
    <Box maxWidth="500px" margin="auto" padding={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          AskAI
        </Heading>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>What to ask?</FormLabel>
              <Textarea
                value={msg}
                onChange={(e) => setmsg(e.target.value)}
                placeholder="Enter your prompt"
                size="md"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full">
              Submit
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default AskAI;
