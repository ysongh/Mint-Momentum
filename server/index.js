import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'body-parser';
import OpenAI from 'openai';

// Load environment variables from .env file
dotenv.config();

const { json } = pkg;
const app = express();
const port = 4000;

const client = new OpenAI({
  baseURL: 'https://nilai-a779.nillion.network/v1',
  apiKey: process.env.NILAI_API_KEY || 'YOUR_API_KEY_HERE'
});


app.use(cors());

// Middleware for parsing JSON bodies
app.use(json());

app.get('/test', async (req, res) => {
  try {
    const response = await client.chat.completions.create({
      model: 'meta-llama/Llama-3.1-8B-Instruct',
      messages: [
        {
          role: 'system',
          content: 'You are a fitness coach.'
        },
        {
          role: 'user',
          content: 'What is better for you, salad or pizza?'
        }
      ],
      stream: false
    });

    // Every SecretLLM response includes a cryptographic signature for verification
    console.log(`Signature: ${response.signature}`);
    console.log(`Response: ${response.choices[0].message.content}`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => res.send('It Work'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
