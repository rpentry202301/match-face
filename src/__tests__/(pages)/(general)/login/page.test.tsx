import LoginPage from '@/app/(pages)/(general)/login/page';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock';

type User = {
  id: number;
  name: string;
  password: string;
  email: string;
  hire_date: string;
  department_id: number;
  status_id: number;
  created_user: string;
  created_at: string;
  update_user: string;
  update_at: string;
};
type Users = User[];

const users: Users = [
  {
    id: 1111,
    name: 'ラクス太郎',
    password: 'password#1',
    email: 'rakus@example.com',
    hire_date: '2023-01-01',
    department_id: 1,
    status_id: 1,
    created_user: 'ラクス責任者',
    created_at: '2022-12-30',
    update_user: 'ラクス責任者',
    update_at: '2023-01-02',
  },
];
const dummyUser: Users = [
  {
    id: 999999,
    name: 'incorrect',
    password: 'incorrectPass#1',
    email: 'incorrect@example.com',
    hire_date: '9999-99-99',
    department_id: 999999,
    status_id: 999999,
    created_user: 'incorrectUser',
    created_at: '9999-99-99',
    update_user: 'incorrectUser',
    update_at: '9999-99-99',
  },
];

const push = jest.fn();
const userEv = userEvent.setup();

// ダミーデータ
const user = users[0];
const notRegisteredUser = dummyUser[0];

// fetchモック
const registeredUserMock = () =>
  new Promise((resolve) => {
    resolve({
      ok: true,
      status: 200,
      body: JSON.stringify({
        userId: `${user.id}`,
        password: `${user.password}`,
      }),
      json: async () => ({ user }),
    });
  });
const notRegisteredUserMock = () =>
  new Promise((resolve) => {
    resolve({
      ok: true,
      status: 200,
      body: JSON.stringify({
        userId: `${notRegisteredUser.id}`,
        password: `${notRegisteredUser.password}`,
      }),
      json: async () => ({ user: [] }),
    });
  });

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

  // 中断したためコメントアウト
  // test('"パスワードを忘れた"のリンクのurlが"/remind"であること', () => {
  //   //"パスワードを忘れた"のリンク
  //   const remindLink = screen.getByRole('link', { name: 'パスワードを忘れた' });
  //   expect(remindLink).toHaveAttribute('href', '/remind');
  // });

  test('"管理者ログイン"のリンクのurlが"/admin/login"であること', () => {
    const adminLoginLink = screen.getByRole('link', { name: '管理者ログイン' });
    expect(adminLoginLink).toHaveAttribute('href', '/admin/login');
  });
});

describe('初めてOrangeButtonがクリックされた時', () => {
  beforeEach(() => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginPage />
      </AppRouterContextProviderMock>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('ユーザーIDが未入力の時', () => {
    test('パスワードが未入力の場合、"※ユーザーIDを入力してください。"と、"※パスワードを入力してください。"が表示されること', async () => {
      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);
      expect(
        await screen.findByText('※ユーザーIDを入力してください。')
      ).toBeInTheDocument();
      expect(
        await screen.findByText('※パスワードを入力してください。')
      ).toBeInTheDocument();
    });
    test('パスワードが入力されている場合、”※ユーザーIDを入力してください。”が表示されること', async () => {
      const passwordInput = screen.getByLabelText('パスワード');
      await userEvent.type(passwordInput, `${notRegisteredUser.password}`);
      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);
      expect(
        await screen.findByText('※ユーザーIDを入力してください。')
      ).toBeInTheDocument();
    });
  });

  describe('ユーザーIDが全角数字のみで入力されている時', () => {
    test('パスワードが未入力の場合、"※半角数字で入力してください。"と、"※パスワードを入力してください"が表示されること', async () => {
      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, '１１１１');
      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);
      expect(
        await screen.findByText('※半角数字で入力してください。')
      ).toBeInTheDocument();
      expect(
        await screen.findByText('※パスワードを入力してください。')
      ).toBeInTheDocument();
    });
    test('パスワードが入力されている場合、"※半角数字で入力してください。"が表示されること', async () => {
      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, '１１１１');
      const passwordInput = screen.getByLabelText('パスワード');
      await userEvent.type(passwordInput, `${notRegisteredUser.password}`);
      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);
      // エラーメッセージが表示される
      expect(
        await screen.findByText('※半角数字で入力してください。')
      ).toBeInTheDocument();
    });
  });

  describe('ユーザーIDが半角英語のみで入力されている時', () => {
    test('パスワードが未入力の場合、"※半角数字で入力してください。"と、"※パスワードを入力してください"が表示されること', async () => {
      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, 'aaaa');

      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);

      expect(
        await screen.findByText('※半角数字で入力してください。')
      ).toBeInTheDocument();
      expect(
        await screen.findByText('※パスワードを入力してください。')
      ).toBeInTheDocument();
    });

    test('パスワードが入力されている場合、"※半角数字で入力してください。"が表示されること', async () => {
      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, 'aaaa');

      const passwordInput = screen.getByLabelText('パスワード');
      await userEvent.type(passwordInput, `${notRegisteredUser.password}`);

      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);

      expect(
        await screen.findByText('※半角数字で入力してください。')
      ).toBeInTheDocument();
    });
  });

  describe('ユーザーIDが半角英語と半角数字で入力されている時', () => {
    test('パスワードが未入力の場合、"※半角数字で入力してください。"と、"※パスワードを入力してください"が表示されること', async () => {
      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, '111a');

      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);

      expect(
        await screen.findByText('※半角数字で入力してください。')
      ).toBeInTheDocument();
      expect(
        await screen.findByText('※パスワードを入力してください。')
      ).toBeInTheDocument();
    });

    test('パスワードが入力されている場合、"※半角数字で入力してください。"が表示されること', async () => {
      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, '111a');

      const passwordInput = screen.getByLabelText('パスワード');
      await userEvent.type(passwordInput, `${notRegisteredUser.password}`);

      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);

      expect(
        await screen.findByText('※半角数字で入力してください。')
      ).toBeInTheDocument();
    });
  });

  describe('登録されているユーザーIDが入力されている時', () => {
    test('パスワードが未入力の場合、"※パスワードを入力してください"が表示されること', async () => {
      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, `${user.id}`);
      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);
      expect(
        await screen.findByText('※パスワードを入力してください。')
      ).toBeInTheDocument();
    });
    test('登録済みのパスワードが入力されている場合、ログインに成功しトップ画面に遷移すること', async () => {
      global.fetch = jest.fn().mockImplementation(registeredUserMock);
      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, `${user.id}`);
      const passwordInput = screen.getByLabelText('パスワード');
      await userEvent.type(passwordInput, `${user.password}`);
      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);
      expect(fetch).toBeCalledTimes(1);
      expect(push).toHaveBeenCalledWith('/');
    });
    test('登録されていないパスワードが入力されている場合、”※ユーザーIDもしくはパスワードに誤りがあります。"が表示されること', async () => {
      global.fetch = jest.fn().mockImplementation(notRegisteredUserMock);
      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, `${user.id}`);
      const passwordInput = screen.getByLabelText('パスワード');
      await userEvent.type(passwordInput, `${notRegisteredUser.password}`);
      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);
      expect(fetch).toBeCalledTimes(1);
      expect(
        await screen.findByText(
          '※ユーザーIDもしくはパスワードに誤りがあります。'
        )
      ).toBeInTheDocument();
    });
  });

  describe('ユーザーIDが半角数字のみで入力されているが、登録されていない時', () => {
    test('パスワードが未入力の場合、"※パスワードを入力してください"が表示されること', async () => {
      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, `${notRegisteredUser.id}`);
      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);
      expect(
        await screen.findByText('※パスワードを入力してください。')
      ).toBeInTheDocument();
    });
    test('パスワードが入力されている場合、”※ユーザーIDもしくはパスワードに誤りがあります。"が表示されること', async () => {
      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, `${notRegisteredUser.id}`);
      const passwordInput = screen.getByLabelText('パスワード');
      await userEvent.type(passwordInput, `${notRegisteredUser.password}`);
      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);
      expect(fetch).toBeCalledTimes(1);
      expect(
        await screen.findByText(
          '※ユーザーIDもしくはパスワードに誤りがあります。'
        )
      ).toBeInTheDocument();
    });
  });
});

describe('OrangeButtonがクリックされた時（2回目以降）', () => {
  beforeEach(() => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LoginPage />
      </AppRouterContextProviderMock>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('"※ユーザーIDを入力してください。"のみが表示されている時', () => {
    test('登録済みのパスワードと登録済みのユーザーIDが入力されている場合、"※ユーザーIDを入力してください。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
      global.fetch = jest.fn().mockImplementation(registeredUserMock);

      const passwordInput = screen.getByLabelText('パスワード');
      await userEvent.type(passwordInput, `${user.password}`);

      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);

      expect(
        await screen.findByText('※ユーザーIDを入力してください。')
      ).toBeInTheDocument();

      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, `${user.id}`);

      // ボタンをクリック（2回目）
      await userEv.click(loginButton);
      expect(fetch).toBeCalledTimes(1);
      expect(
        await waitFor(() =>
          screen.queryByText('※ユーザーIDを入力してください。')
        )
      ).toBeNull();
      expect(push).toHaveBeenCalledWith('/');
    });
  });

  describe('"※半角数字で入力してください"のみが表示されている時', () => {
    test('登録済みのパスワードと登録済みのユーザーIDが入力されている場合、"※半角数字で入力してください。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
      global.fetch = jest.fn().mockImplementation(registeredUserMock);

      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, 'aaaa');

      const passwordInput = screen.getByLabelText('パスワード');
      await userEvent.type(passwordInput, `${user.password}`);

      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);

      expect(
        await screen.findByText('※半角数字で入力してください。')
      ).toBeInTheDocument();

      await userEvent.clear(userIdInput);
      await userEvent.type(userIdInput, `${user.id}`);

      // ボタンをクリック（2回目）
      await userEv.click(loginButton);
      expect(fetch).toBeCalledTimes(1);
      expect(
        await waitFor(() => screen.queryByText('※半角数字で入力してください。'))
      ).toBeNull();
      expect(push).toHaveBeenCalledWith('/');
    });
  });

  describe('"※ユーザーIDもしくはパスワードに誤りがあります。"のみが表示されている時', () => {
    test('登録済みのユーザーIDと登録済みのパスワードが入力されている場合、"※ユーザーIDもしくはパスワードに誤りがあります。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
      global.fetch = jest.fn().mockImplementation(notRegisteredUserMock);

      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, `${notRegisteredUser.id}`);

      const passwordInput = screen.getByLabelText('パスワード');
      await userEvent.type(passwordInput, `${user.password}`);

      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);

      expect(
        await screen.findByText(
          '※ユーザーIDもしくはパスワードに誤りがあります。'
        )
      ).toBeInTheDocument();
      expect(fetch).toBeCalledTimes(1);

      await userEvent.clear(userIdInput);
      await userEvent.type(userIdInput, `${user.id}`);
      global.fetch = jest.fn().mockImplementation(registeredUserMock);

      // ボタンをクリック（2回目）
      await userEv.click(loginButton);
      expect(fetch).toBeCalledTimes(1);
      expect(
        await waitFor(() =>
          screen.queryByText('※ユーザーIDもしくはパスワードに誤りがあります。')
        )
      ).toBeNull();
      expect(push).toHaveBeenCalledWith('/');
    });
  });

  describe('"※パスワードを入力してください"のみが表示されている時', () => {
    test('登録済みのユーザーIDと登録済みのパスワードが入力されている場合、"※パスワードを入力してください。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
      global.fetch = jest.fn().mockImplementation(registeredUserMock);

      const userIdInput = screen.getByLabelText('ユーザーID');
      await userEvent.type(userIdInput, `${user.id}`);

      const loginButton = screen.getByRole('button', { name: 'ログイン' });
      await userEv.click(loginButton);

      expect(
        await screen.findByText('※パスワードを入力してください。')
      ).toBeInTheDocument();

      const passwordInput = screen.getByLabelText('パスワード');
      await userEvent.type(passwordInput, `${user.password}`);

      // ボタンをクリック（2回目）
      await userEv.click(loginButton);
      expect(fetch).toBeCalledTimes(1);
      expect(
        await waitFor(() =>
          screen.queryByText('※パスワードを入力してください。')
        )
      ).toBeNull();
      expect(push).toHaveBeenCalledWith('/');
    });
  });
});
