import fs from "fs";
import dotenv from "dotenv";
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
dotenv.config();

const pdf_path = "./Context.pdf";
const buffer = fs.readFileSync(pdf_path);
const pdfResult = new PDFParse({ data: buffer });
const result = await pdfResult.getText();

const textspillter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 150
});
const docs = await textspillter.createDocuments([result.text]);

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  modelName: "gemini-embedding-001",
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: "Document_title"
});

console.log("Embedding 92 documents...");
try {
  const vectors = await embeddings.embedDocuments(docs.map(d => d.pageContent));
  console.log("Vectors total count:", vectors.length);
  console.log("Vectors[0] length:", vectors[0]?.length);
  const emptyCount = vectors.filter(v => !v || v.length === 0).length;
  console.log("Empty vectors count:", emptyCount);
} catch (e: any) {
  console.error("Embedding 92 docs error:", e);
}
