# LLM Chat Web App

A lightweight single-page chat interface to talk with a Groq Cloud language model. Messages stream token-by-token for a real-time experience.

## Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Create a `.env` file based on `.env.example` and add your Groq API key.
3. Start the dev server
   ```bash
   npm run dev
   ```
4. Build and preview
   ```bash
   npm run build && npm run preview
   ```

## Architecture

The app is built with **React**, **Vite**, **TypeScript**, and **TailwindCSS**. State management is handled inside a custom `useChat` hook that stores the list of messages and provides a `sendMessage` function. When the user submits a message, `useChat` calls `streamChat` which talks to the Groq API using `fetch` with streaming enabled. Incoming SSE chunks are parsed token-by-token to update the latest assistant message in real time. Components are small and focused: `Chat` orchestrates the conversation view, `MessageList` renders past messages, and `ChatInput` manages user input. Vitest is configured for unit testing key logic such as the chat hook.

## Notes

- Message history is persisted to `localStorage` so past conversations remain after refreshing the page.
- Network calls are streamed via the browser `fetch` API which supports Server-Sent Events.
- A **Regenerate** button lets you retry the previous prompt to get a new assistant response.
