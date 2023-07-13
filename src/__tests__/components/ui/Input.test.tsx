import Input from '@/components/ui/Input';
import { render, screen } from '@testing-library/react';

describe('Input.test.tsx', () => {
  test('スナップショット', () => {
    const { container } = render(<Input id="" />);
    console.log('render(<Input id="" />)', render(<Input id="" />));
    expect(container).toMatchSnapshot();
  });
});
