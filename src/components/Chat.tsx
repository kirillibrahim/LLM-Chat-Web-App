import { useRef, useEffect } from 'react';
import useChat from '../hooks/useChat';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

export default function Chat() {
  const { messages, sendMessage, regenerateLast, isLoading, error } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (bottomRef.current && messages.length) {
      bottomRef.current.scrollIntoView({
        behavior: isFirstRender.current ? "auto" : "smooth",
      });
      isFirstRender.current = false;
    }
  }, [messages]);

  const handleSend = async (text: string) => {
    await sendMessage(text);
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRegenerate = async () => {
    await regenerateLast();
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='w-full max-w-4xl'>
      <div className="w-full  flex flex-col gap-4 h-[75vh] overflow-y-auto">
        <div className="border border-gray-300 dark:border-gray-700 rounded-md flex-1 p-4 bg-gray-50 dark:bg-gray-900">
          <MessageList
            messages={messages}
            onRegenerate={handleRegenerate}
            isLoading={isLoading}
          />
          {isLoading && <p className="text-sm text-gray-500">Assistant is typing...</p>}
          <div ref={bottomRef} />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      <div className='mt-4 flex justify-center'>
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>

    </div>
  );
}
