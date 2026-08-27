import express from "express";
import dotenv from "dotenv";
import fs from "fs";

import { QdrantVectorStore } from "@langchain/qdrant";
import { ChatGroq } from "@langchain/groq";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFParse } from "pdf-parse";

import { TaskType } from "@google/generative-ai";
import {
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// ─────────────────────────────────────────────
// Groq LLM
// ─────────────────────────────────────────────

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "openai/gpt-oss-120b",
  maxTokens: 2048,
  temperature: 1,
  maxRetries: 2,
});

// ─────────────────────────────────────────────
// Google Embeddings
// ─────────────────────────────────────────────

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  modelName: "gemini-embedding-001",
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: "Document_title",
});

// ─────────────────────────────────────────────
// Qdrant Vector Store
// ─────────────────────────────────────────────

const vectorStore = await QdrantVectorStore.fromExistingCollection(
  embeddings,
  {
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
    collectionName: "rag_test_for_final",
  }
);

// ─────────────────────────────────────────────
// Upload PDF to Qdrant
// ─────────────────────────────────────────────

const uploadPDF = async () => {
  try {
    const pdfPath = "D:/Backend_Advanced_Revision/ragwith_ts/Context.pdf";

    const buffer = fs.readFileSync(pdfPath);

    const pdf = new PDFParse({
      data: buffer,
    });

    const result = await pdf.getText();

    const text = result.text;

    // Split PDF text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 150,
    });

    const docs = await textSplitter.createDocuments([text]);

    // Store chunks + embeddings in Qdrant
    await vectorStore.addDocuments(docs);

    console.log("PDF data uploaded successfully 🚀");
  } catch (error) {
    console.error("PDF upload error:", error);
  }
};

// Upload PDF when server starts
uploadPDF();

// ─────────────────────────────────────────────
// AI / RAG Route
// ─────────────────────────────────────────────

app.post("/ai", async (req, res) => {
  try {
    const { message } = req.body;

    // Validate message
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    // Search Qdrant for relevant documents
    const docs = await vectorStore.similaritySearch(
      message,
      4
    );

    // Create context from retrieved documents
    const context = docs
      .map((doc) => doc.pageContent)
      .join("\n\n");

    // Ask Groq using only retrieved context
    const response = await llm.invoke([
      new SystemMessage(`
You are a RAG AI assistant.

STRICT RULES:
- Answer ONLY using the provided context.
- Do NOT use outside knowledge.
- Do NOT make up information.
- If the answer cannot be found in the context, say exactly:

"I don't know from the uploaded PDF and other documents."

Context:
${context}
      `),

      new HumanMessage(message),
    ]);

    console.log("AI Response:", response.content);

    return res.json({
      response: response.content,
    });
  } catch (error: any) {
    console.error("AI Error:", error);

    return res.status(500).json({
      error: error?.message || "Something went wrong",
    });
  }
});

// ─────────────────────────────────────────────
// Health Check
// ─────────────────────────────────────────────

app.get("/check", (_req, res) => {
  res.json({
    message: "Jarvis AI Backend is running 🚀",
  });
});

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});