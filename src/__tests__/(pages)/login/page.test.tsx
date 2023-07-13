import LoginPage from '@/app/(pages)/(general)/login/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock';
import users from '@/const/login';
import Input from '@/components/ui/Input';

type User = {
  id: number;
  user_id: string;
  password: string;
};

const user = userEvent.setup();
describe('LoginPageのテスト', () => {
  //   test('スナップショット', () => {
  //     const push = jest.fn();

  //     const { container } = render(
  //       <AppRouterContextProviderMock router={{ push }}>
  //         <LoginPage />
  //       </AppRouterContextProviderMock>
  //     );
  //     expect(container).toMatchSnapshot();
  //   });

  test('入力テスト', async () => {
    const push = jest.fn();

    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginPage />
      </AppRouterContextProviderMock>
    );

    // ユーザーIDを入力;
    const userIdInput = screen.getByLabelText('ユーザーID');
    screen.debug(userIdInput);
    await userEvent.type(userIdInput, `${users[0].id}`);
    screen.debug(userIdInput);

    // パスワードを入力
    const passwordInput = screen.getByLabelText('パスワード');
    screen.debug(passwordInput);
    await userEvent.type(passwordInput, `${users[0].password}`);
    screen.debug(passwordInput);

    // ボタンの確認
    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    expect(loginButton).toBeInTheDocument();
    await user.click(loginButton);
    expect(push).toHaveBeenCalledWith('/');

    const label = document.getElementById('userId');
    console.log('label', label);
    expect(label).toHaveClass('border border-black w-96 h-10 mt-2');
  });
});
