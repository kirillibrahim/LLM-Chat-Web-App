/// <reference types="vite/client" />
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const API_KEY = import.meta.env.VITE_GROQ_API_KEY as string

console.log("API_KEY: ", API_KEY);
export async function streamChat(
  messages: { role: 'user' | 'assistant'; content: string }[],
  onToken: (token: string) => void
): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      messages,
      model: 'llama-3.3-70b-versatile',
      stream: true,
    }),
  });

  if (!response.ok || !response.body) {
    throw new Error('Failed to connect to API');
  }

  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .getReader();

  let fullText = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const lines = value.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const data = trimmed.replace(/^data:\s*/, '');
      if (data === '[DONE]') {
        reader.releaseLock();
        return fullText;
      }
      try {
        const json = JSON.parse(data);
        const token = json.choices[0].delta.content || '';
        if (token) {
          fullText += token;
          onToken(token);
        }
      } catch (_) {
        continue;
      }
    }
  }
  return fullText;
}
