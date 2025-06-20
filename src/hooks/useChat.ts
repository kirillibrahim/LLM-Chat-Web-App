import { useState, useEffect } from 'react';
import { Message } from '../constants/message';
import { streamChat } from '../api/groq';

const STORAGE_KEY = 'chatMessages';

export default function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load stored messages
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Message[] = JSON.parse(stored);
        setMessages(parsed);
      } catch (_) {
      }
    }
  }, []);

  // store new messages 
  useEffect(() => {
    if (messages.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    setError(null);
    const userMsg: Message = { role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setIsLoading(true);
    try {
      const assistantContent = await streamChat([...messages, userMsg], (token) => {
        setMessages((m) => {
          const last = m[m.length - 1];
          if (last && last.role === 'assistant') {
            return [...m.slice(0, -1), { role: 'assistant', content: last.content + token }];
          }
          return [...m, { role: 'assistant', content: token }];
        });
      });
      setIsLoading(false);
      return assistantContent;
    } catch (e) {
      setError((e as Error).message);
      setIsLoading(false);
      return null;
    }
  };

  const regenerateLast = async () => {
    if (messages.length < 2) return null;
    const last = messages[messages.length - 1];
    const prev = messages[messages.length - 2];
    if (last.role !== 'assistant' || prev.role !== 'user') return null;

    const convo = messages.slice(0, -1);
    setMessages(convo);
    setError(null);
    setIsLoading(true);
    try {
      const assistantContent = await streamChat(convo, (token) => {
        setMessages((m) => {
          const lastMsg = m[m.length - 1];
          if (lastMsg && lastMsg.role === 'assistant') {
            return [
              ...m.slice(0, -1),
              { role: 'assistant', content: lastMsg.content + token },
            ];
          }
          return [...m, { role: 'assistant', content: token }];
        });
      });
      setIsLoading(false);
      return assistantContent;
    } catch (e) {
      setError((e as Error).message);
      setIsLoading(false);
      return null;
    }
  };

  return { messages, sendMessage, regenerateLast, isLoading, error };
};
