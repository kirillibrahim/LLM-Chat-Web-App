import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ChatInput from '../ChatInput';

it('submits text on Enter and clears input', async () => {
  const handleSend = jest.fn();
  render(<ChatInput onSend={handleSend} />);
  const textarea = screen.getByPlaceholderText('Type your message...');
  await userEvent.type(textarea, 'hello{enter}');
  expect(handleSend).toHaveBeenCalledWith('hello');
  expect(textarea).toHaveValue('');
});
