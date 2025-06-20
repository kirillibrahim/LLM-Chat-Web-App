import { render, screen } from '@testing-library/react';
import MessageList from '../MessageList';
import { Message } from '../../constants/message';

const messages: Message[] = [
  { role: 'user', content: 'hi' },
  { role: 'assistant', content: 'hello' },
];

test('renders messages and regenerate button when conditions met', () => {
  render(
    <MessageList messages={messages} onRegenerate={jest.fn()} isLoading={false} />
  );
  expect(screen.getByText('hi')).toBeInTheDocument();
  expect(screen.getByText('hello')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Regenerate' })).toBeInTheDocument();
});

test('hides regenerate button while loading', () => {
  render(
    <MessageList messages={messages} onRegenerate={jest.fn()} isLoading={true} />
  );
  expect(screen.queryByRole('button', { name: 'Regenerate' })).toBeNull();
});
