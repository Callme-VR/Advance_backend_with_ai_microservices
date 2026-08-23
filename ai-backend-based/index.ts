import express from "express";
import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API,
  model: "qwen/qwen3.6-27b",
  maxTokens: 2048,
  temperature: 1,
});



app.post("/ai", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }
    // Prevent oversized payloads from failing Groq API limit
    if (typeof message === "string" && message.length > 50000) {
      return res.status(413).json({
        error: "Input message is too large.",
      });
    }

    const response = await llm.invoke(message);

    res.json({
      response: response.content,
    });
  } catch (error: any) {
    console.error("Groq API Error:", error?.message || error);

    if (error?.status === 413 || error?.code === "request_too_large") {
      return res.status(413).json({
        error: "Request payload too large for the AI model.",
      });
    }

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});