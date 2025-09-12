import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'body-parser';
import { NilaiOpenAIClient, NilAuthInstance } from '@nillion/nilai-ts';

// Load environment variables from .env file
dotenv.config();

const { json } = pkg;
const app = express();
const port = 4000;

 const client = new NilaiOpenAIClient({
    baseURL: "https://nilai-a779.nillion.network/v1/",
    apiKey: process.env.NILAI_API_KEY,
    nilauthInstance: NilAuthInstance.SANDBOX,
  });

app.use(cors());

// Middleware for parsing JSON bodies
app.use(json());

app.get('/test', async (req, res) => {
  try {
    console.log('API Key exists:', !!process.env.NILAI_API_KEY);
    console.log('API Key prefix:', process.env.OPENAI_API_KEY?.substring(0, 10));

    if (!process.env.NILAI_API_KEY) {
      return res.status(500).json({ error: "NILAI_API_KEY is not configured" });
    }

    const response = await client.chat.completions.create({
      model: 'meta-llama/Llama-3.1-8B-Instruct',
      messages: [
        {
          role: 'system',
          content: 'You are a motivational coach.'
        },
        {
          role: 'user',
          content: 'I feeling lazy, need some motivational'
        }
      ],
      stream: false
    });

    // Every SecretLLM response includes a cryptographic signature for verification
    console.log(`Signature: ${response.signature}`);
    console.log(`Response: ${response.choices[0].message.content}`);
    res.json({ data: response.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/askai', async (req, res) => {
  const msg = req.body.msg;

  try {
    if (!process.env.NILAI_API_KEY) {
      return res.status(500).json({ error: "NILAI_API_KEY is not configured" });
    }

    const response = await client.chat.completions.create({
      model: "google/gemma-3-27b-it",
      messages: [
        {
          role: 'system',
          content: 'You are a motivational coach.'
        },
        {
          role: 'user',
          content: msg
        }
      ],
    });

    console.log(`Response: ${response.choices[0].message.content}`);
    res.json({ data: response.choices[0].message.content });
  } catch (error) {
    console.error('Error calling Nilai API:', error);
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
