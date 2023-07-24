import LoginPage from '@/app/(pages)/(general)/login/page';
import { findByText, render, screen } from '@testing-library/react';
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
describe('スナップショット', () => {
  test('スナップショット', () => {
    const { container } = render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginPage />
      </AppRouterContextProviderMock>
    );
    expect(container).toMatchSnapshot();
  });
});

describe('ページがレンダリングされた時', () => {
  beforeEach(() => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginPage />
      </AppRouterContextProviderMock>
    );
  });

  test('"パスワードを忘れた"のリンクのurlが"/remind"であること', () => {
    //"パスワードを忘れた"のリンク
    const remindLink = screen.getByRole('link', { name: 'パスワードを忘れた' });
    expect(remindLink).toHaveAttribute('href', '/remind');
  });

  test('"管理者ログイン"のリンクのurlが"/admin/login"であること', () => {
    // "管理者ログイン"のリンク
    const adminLoginLink = screen.getByRole('link', { name: '管理者ログイン' });
    expect(adminLoginLink).toHaveAttribute('href', '/admin/login');
  });
});

describe('OrangeButtonがクリックされた時', () => {
  beforeEach(() => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginPage />
      </AppRouterContextProviderMock>
    );
  });

  test('登録済みユーザーIDと登録済みパスワードを入力した際、ログインに成功しトップ画面に遷移すること', async () => {
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

  test('ユーザーIDが未入力の際、"※ユーザーIDを入力してください。"と表示されること', async () => {
    // 登録済みパスワードを入力
    const passwordInput = screen.getByLabelText('パスワード');
    await userEvent.type(passwordInput, `${users[0].password}`);

    // ボタンを確認
    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    expect(loginButton).toBeInTheDocument();

    // ボタンをクリック
    await user.click(loginButton);

    // エラーメッセージが表示される
    expect(
      await screen.findByText('※ユーザーIDを入力してください。')
    ).toBeInTheDocument();
  }),
    test('ユーザーIDに半角数字以外が入力されている際、"※半角数字で入力してください。"と表示されること', async () => {
      //
    });

  test.todo(
    '登録されていないユーザーIDが入力されている際、"※正しいユーザーIDを入力してください。"と表示されること'
  );

  test.todo(
    'パスワードが未入力の際、"※パスワードを入力してください。"と表示されること'
  );

  test.todo(
    '間違ったパスワードが入力されている際、"※正しいパスワードを入力してください。"と表示されること。'
  );
});
