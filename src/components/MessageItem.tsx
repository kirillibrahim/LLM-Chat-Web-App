import { useState } from 'react';
import { Message } from '../constants/message';
import ReactMarkdown from 'react-markdown';

interface Props {
  message: Message;
  showRegenerate?: boolean;
  onRegenerate?: () => void;
}

export default function MessageItem({ message, showRegenerate, onRegenerate }: Props) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy message', err);
    }
  };
  return (
    <div
      className={`w-full rounded-lg p-4 whitespace-pre-wrap ${
        isUser
          ? 'bg-gray-100 dark:bg-[#343541] text-gray-900 dark:text-gray-50'
          : 'bg-white dark:bg-[#444654]'
      }`}
    >
      <div className="flex"> 
        <div className="flex-1">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
       
      </div>
       {showRegenerate && (
          <div className="flex mt-3 justify-end items-center gap-2">
            <button
              onClick={handleCopy}
              aria-label="Copy message"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-300 relative"
            >       
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) :

              (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="9" y="2" width="6" height="4" rx="1" ry="1" />
                </svg>
              )
            
            }
            </button>
            <button
              onClick={onRegenerate}
              aria-label="Regenerate"
              className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M21 12a9 9 0 1 1-3-6.7" />
                <polyline points="21 3 21 9 15 9" />
              </svg>
            </button>
            

          </div>
        )}
    </div>
  );
}
