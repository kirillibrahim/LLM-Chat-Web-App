import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../ThemeToggle';
import * as useThemeHook from '../../hooks/useTheme';

const mockToggle = jest.fn();

function setup(theme: 'light' | 'dark') {
  jest.spyOn(useThemeHook, 'useTheme').mockReturnValue({ theme, toggle: mockToggle });
  return render(<ThemeToggle />);
}

test('calls toggle on click', async () => {
  setup('light');
  await userEvent.click(screen.getByRole('button'));
  expect(mockToggle).toHaveBeenCalled();
});

test('shows moon icon for light theme', () => {
  const { container } = setup('light');
  const path = container.querySelector('svg path');
  expect(path?.getAttribute('d')).toContain('21 12.79');
});

test('shows sun icon for dark theme', () => {
  const { container } = setup('dark');
  const path = container.querySelector('svg path');
  expect(path?.getAttribute('d')).toContain('M12 18');
});
