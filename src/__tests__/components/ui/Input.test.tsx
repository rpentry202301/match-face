import Input from '@/components/ui/Input';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Input', () => {
  render(<Input id="" />);
  test('renders Input Component', () => {
    const textBox = screen.getByRole('textbox');
    screen.debug();
    fireEvent.change(textBox);
  });
});
