import OrangeButton from '@/components/ui/button/OrangeButton';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('スナップショットテスト', () => {
  const { container } = render(<OrangeButton label="OrangeButton" />);
  expect(container).toMatchSnapshot();
});

test('labelに与えた値がbuttonの値となる', () => {
  render(<OrangeButton label="OrangeButton" />);
  const button = screen.getByRole('button', { name: 'OrangeButton' });
  expect(button).toBeInTheDocument();
  // const label = screen.getByText('OrangeButton');
  // expect(label).toBeInTheDocument();
  screen.debug();
});
