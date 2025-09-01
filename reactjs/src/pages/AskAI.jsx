import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Text,
  Textarea,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';

const AskAI = () => {
  const [msg, setmsg] = useState('');
  const [aiData, setaiData] = useState(null);
  const [aiLoading, setaiLoading] = useState(false);
  const [error, setError] = useState(null);

  const toast = useToast();

  const handleSubmit = async (e) => {
    try {
      setaiLoading(true);
      console.error(null);
      e.preventDefault();
      
      console.log('Submitting tip:', msg);

      const response = await fetch(`${import.meta.env.VITE_SERVERURL}/askai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({msg})
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setaiData(result.data);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setaiLoading(false);
    }
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

            <Button isLoading={aiLoading} type="submit" colorScheme="blue" width="full">
              Submit
            </Button>
          </VStack>
        </form>

        <Text fontSize="lg" color="red" mb={2}>
          {error}
        </Text>

        <Text fontSize="lg" mb={4}>
          {aiData}
        </Text>
      </VStack>
    </Box>
  );
};

export default AskAI;
