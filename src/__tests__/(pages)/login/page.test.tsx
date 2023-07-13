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

  test('ログインに成功するか確認', async () => {
    const push = jest.fn();

    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginPage />
      </AppRouterContextProviderMock>
    );

    // 登録済みユーザーIDを入力;
    const userIdInput = screen.getByLabelText('ユーザーID');
    screen.debug(userIdInput);
    await userEvent.type(userIdInput, `${users[0].id}`);
    screen.debug(userIdInput);

    // 登録済みパスワードを入力
    const passwordInput = screen.getByLabelText('パスワード');
    screen.debug(passwordInput);
    await userEvent.type(passwordInput, `${users[0].password}`);
    screen.debug(passwordInput);

    // ボタンの存在確認
    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    expect(loginButton).toBeInTheDocument();
    // ボタンをクリック
    await user.click(loginButton);
    // トップ画面へ遷移
    expect(push).toHaveBeenCalledWith('/');
  });

  test('"パスワードを忘れた"のリンクが"/remindになっているか', () => {
    const push = jest.fn();

    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginPage />
      </AppRouterContextProviderMock>
    );
    //"パスワードを忘れた"のリンク
    const remindLink = screen.getByRole('link', { name: 'パスワードを忘れた' });
    screen.debug(remindLink);
    expect(remindLink).toHaveAttribute('href', '/remind');
  });

  test('"管理者ログイン"のリンクが"/admin/loginになっているか', () => {
    const push = jest.fn();

    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginPage />
      </AppRouterContextProviderMock>
    );
    // "管理者ログイン"のリンク
    const adminLoginLink = screen.getByRole('link', { name: '管理者ログイン' });
    screen.debug(adminLoginLink);
    expect(adminLoginLink).toHaveAttribute('href', '/admin/login');
  });
});
