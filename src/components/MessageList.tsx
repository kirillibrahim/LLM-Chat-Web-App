import MessageItem from './MessageItem';
import { Message } from '../constants/message';

interface Props {
  messages: Message[];
  onRegenerate: () => void;
  isLoading: boolean;
}

export default function MessageList({ messages, onRegenerate, isLoading }: Props) {
  const lastIndex = messages.length - 1;
  const canRegenerate =
    !isLoading &&
    messages.length >= 2 &&
    messages[lastIndex]?.role === 'assistant';
   console.log("messages: ", messages);
  return (
    <div className="flex flex-col gap-4">
      {messages.length > 0 ?
        <>
        {messages.map((m, i) => (
            <MessageItem
              key={i}
              message={m}
              showRegenerate={canRegenerate && i === lastIndex && m.role === 'assistant'}
              onRegenerate={onRegenerate}
            />
          ))}
        </>
      :
        <div className="flex items-center justify-center h-full w-full">
          <h1>How can I help you today?</h1>
        </div>
      }
      
    </div>
  );
}
