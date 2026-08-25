import express from "express";
import dotenv from "dotenv";

import { ChatGroq } from "@langchain/groq";
import { TavilySearch } from "@langchain/tavily";
import { ToolNode } from "@langchain/langgraph/prebuilt";

import { AIMessage } from "@langchain/core/messages";
import {
  MemorySaver,
  MessagesAnnotation,
  StateGraph,
} from "@langchain/langgraph";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());


// ─────────────────────────────────────────────
// Tavily Search Tool
// ─────────────────────────────────────────────

const tool = new TavilySearch({
  maxResults: 3,
  topic: "general",
});

const tools = [tool];

const toolNode = new ToolNode(tools);

// ─────────────────────────────────────────────
// Memory
// ─────────────────────────────────────────────

const memorySaver = new MemorySaver();


// ─────────────────────────────────────────────
// Groq LLM
// ─────────────────────────────────────────────

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API,
  model: "openai/gpt-oss-120b",
  maxTokens: 2048,
  temperature: 1,
  maxRetries: 2,
}).bindTools(tools);


// i prefer now the mistal api key beacause the groq started charging for apis calling

// ─────────────────────────────────────────────
// LLM Node
// ─────────────────────────────────────────────

const callLLM = async (state: typeof MessagesAnnotation.State) => {
  console.log("Current state:", state);

  const response = await llm.invoke([
    {
      role: "system",
      content: `
You are Jarvis, an intelligent AI assistant.

Use conversation memory first.

Only use tools when the answer requires
external or real-time information such as:

- Current weather
- Latest news
- Web search
- Current stock prices
- Recent events
- Other information that requires up-to-date data

Do NOT call tools for:

- Simple conversation
- Greetings
- General knowledge
- Memory-based questions
- Personal context
- Questions you can answer without external information

Be helpful, concise, and accurate.
      `,
    },
    ...state.messages,
  ]);

  return {
    messages: [response],
  };
};


// ─────────────────────────────────────────────
// Decide whether to use tools
// ─────────────────────────────────────────────

const shouldContinue = (
  state: typeof MessagesAnnotation.State
) => {
  const lastMessage = state.messages[
    state.messages.length - 1
  ];

  if ((lastMessage as AIMessage | undefined)?.tool_calls?.length) {
    return "tools";
  }

  return "__end__";
};


// ─────────────────────────────────────────────
// Create LangGraph
// ─────────────────────────────────────────────

const graph = new StateGraph(MessagesAnnotation)
  .addNode("callLLM", callLLM)
  .addNode("tools", toolNode)

  .addEdge("__start__", "callLLM")

  .addConditionalEdges(
    "callLLM",
    shouldContinue
  )

  .addEdge("tools", "callLLM")

  .compile({
    checkpointer: memorySaver,
  });


// ─────────────────────────────────────────────
// AI Route
// ─────────────────────────────────────────────

app.post("/ai", async (req, res) => {
  try {
    const { message, threadId } = req.body;

    // Validate message
    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    // Prevent extremely large requests
    if (
      typeof message === "string" &&
      message.length > 50000
    ) {
      return res.status(413).json({
        error: "Input message is too large.",
      });
    }

    // Use a thread ID for conversation memory
    const conversationId =
      threadId || "default-thread";

    // Invoke LangGraph
    const result = await graph.invoke(
      {
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        configurable: {
          thread_id: conversationId,
        },
      }
    );

    // Get the final AI response
    const lastMessage =
      result.messages[result.messages.length - 1];

    return res.json({
      response: lastMessage?.content || "",
      threadId: conversationId,
    });

  } catch (error: any) {
    console.error(
      "AI Error:",
      error?.message || error
    );

    if (
      error?.status === 413 ||
      error?.code === "request_too_large"
    ) {
      return res.status(413).json({
        error:
          "Request payload too large for the AI model.",
      });
    }

    return res.status(500).json({
      error:
        error?.message ||
        "Something went wrong",
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
  console.log(
    `Server is listening on port ${PORT}`
  );
});