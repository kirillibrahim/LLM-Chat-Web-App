import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MessageItem from '../MessageItem';
import { Message } from '../../constants/message';

test('calls onRegenerate when regenerate button clicked', async () => {
  const msg: Message = { role: 'assistant', content: 'reply' };
  const onRegenerate = jest.fn();
  render(
    <MessageItem message={msg} showRegenerate onRegenerate={onRegenerate} />
  );
  await userEvent.click(screen.getByRole('button', { name: 'Regenerate' }));
  expect(onRegenerate).toHaveBeenCalled();
});

test('copies message text when copy button clicked', async () => {
  const writeText = jest.fn();
  Object.assign(navigator, { clipboard: { writeText } });
  const msg: Message = { role: 'assistant', content: 'reply' };
  render(
    <MessageItem message={msg} showRegenerate onRegenerate={jest.fn()} />
  );
  await userEvent.click(screen.getByRole('button', { name: 'Copy message' }));
  expect(writeText).toHaveBeenCalledWith('reply');
});
