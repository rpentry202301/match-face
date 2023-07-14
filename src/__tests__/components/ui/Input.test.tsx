import Input from '@/components/ui/Input';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Input.test.tsx', () => {
  test('スナップショット', () => {
    const { container } = render(<Input id="" />);
    expect(container).toMatchSnapshot();
  });

  test('コールバック関数が反応するかどうか', async () => {
    const onChange = jest.fn();
    render(<Input id="" onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'password');
    // userEventは文字を入力する度に発火する→3文字なら3回
    expect(onChange).toHaveBeenCalledTimes(8);
  });
});
