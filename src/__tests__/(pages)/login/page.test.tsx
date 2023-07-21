import LoginPage from '@/app/(pages)/(general)/login/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock';
import users from '@/const/login';

type User = {
  id: number;
  user_id: string;
  password: string;
};

const push = jest.fn();
const user = userEvent.setup();
test('スナップショットテスト', () => {
  const { container } = render(
    <AppRouterContextProviderMock router={{ push }}>
      <LoginPage />
    </AppRouterContextProviderMock>
  );
  expect(container).toMatchSnapshot();
});

describe('ページ全体のテスト', () => {
  beforeEach(() => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginPage />
      </AppRouterContextProviderMock>
    );
  });

  test('正しいユーザーIDとパスワードを入力した際、ログインに成功する。', async () => {
    // 登録済みユーザーIDを入力;
    const userIdInput = screen.getByLabelText('ユーザーID');
    await userEvent.type(userIdInput, `${users[0].id}`);

    // 登録済みパスワードを入力
    const passwordInput = screen.getByLabelText('パスワード');
    await userEvent.type(passwordInput, `${users[0].password}`);

    // ボタンの存在確認
    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    expect(loginButton).toBeInTheDocument();
    // ボタンをクリック
    await user.click(loginButton);
    // トップ画面へ遷移
    expect(push).toHaveBeenCalledWith('/');
  });

  test('"パスワードを忘れた"のリンクのurlが"/remindになっている', () => {
    const push = jest.fn();

    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginPage />
      </AppRouterContextProviderMock>
    );
    //"パスワードを忘れた"のリンク
    const remindLink = screen.getByRole('link', { name: 'パスワードを忘れた' });
    expect(remindLink).toHaveAttribute('href', '/remind');
  });

  test('"管理者ログイン"のリンクのurlが"/admin/loginになっている', () => {
    const push = jest.fn();

    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginPage />
      </AppRouterContextProviderMock>
    );
    // "管理者ログイン"のリンク
    const adminLoginLink = screen.getByRole('link', { name: '管理者ログイン' });
    expect(adminLoginLink).toHaveAttribute('href', '/admin/login');
  });
});
