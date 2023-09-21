import LoginPage from '@/app/(pages)/(general)/login/page';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock';
import { dummyUser, users } from '@/const/login';

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

  //   describe('"※ユーザーIDを入力してください。"のみが表示されている時', () => {
  //     test('登録済みのパスワードと登録済みのユーザーIDが入力されている場合、"※ユーザーIDを入力してください。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
  //       // 登録済みパスワードを入力
  //       const passwordInput = screen.getByLabelText('パスワード');
  //       await userEvent.type(passwordInput, `${registeredUser.password}`);

  //       // 初めてボタンをクリック
  //       const loginButton = screen.getByRole('button', { name: 'ログイン' });
  //       await user.click(loginButton);

  //       // エラーメッセージが表示されている
  //       expect(
  //         await screen.findByText('※ユーザーIDを入力してください。')
  //       ).toBeInTheDocument();

  //       // 登録済みユーザーIDを入力;
  //       const userIdInput = screen.getByLabelText('ユーザーID');
  //       await userEvent.type(userIdInput, `${registeredUser.id}`);

  //       // ボタンをクリック（2回目）
  //       await user.click(loginButton);

  //       // エラーメッセージが消えたことを確認
  //       expect(
  //         await waitFor(() =>
  //           screen.queryByText('※ユーザーIDを入力してください。')
  //         )
  //       ).toBeNull();

  //       // トップ画面へ遷移
  //       expect(push).toHaveBeenCalledWith('/');
  //     });
  //   });

  //   describe('"※半角数字で入力してください"のみが表示されている時', () => {
  //     test('登録済みのパスワードと登録済みのユーザーIDが入力されている場合、"※半角数字で入力してください。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
  //       // ユーザーIDを半角英語で入力
  //       const userIdInput = screen.getByLabelText('ユーザーID');
  //       await userEvent.type(userIdInput, 'aaaa');

  //       // 登録済みパスワードを入力
  //       const passwordInput = screen.getByLabelText('パスワード');
  //       await userEvent.type(passwordInput, `${registeredUser.password}`);

  //       // 初めてボタンをクリック
  //       const loginButton = screen.getByRole('button', { name: 'ログイン' });
  //       await user.click(loginButton);

  //       // エラーメッセージが表示されている
  //       expect(
  //         await screen.findByText('※半角数字で入力してください。')
  //       ).toBeInTheDocument();

  //       // 入力した値を削除
  //       await userEvent.clear(userIdInput);
  //       // 登録済みユーザーIDを入力;
  //       await userEvent.type(userIdInput, `${registeredUser.id}`);

  //       // ボタンをクリック（2回目）
  //       await user.click(loginButton);

  //       // エラーメッセージが消えたことを確認
  //       expect(
  //         await waitFor(() => screen.queryByText('※半角数字で入力してください。'))
  //       ).toBeNull();

  //       // トップ画面へ遷移
  //       expect(push).toHaveBeenCalledWith('/');
  //     });
  //   });

  //   describe('"※正しいユーザーIDを入力してください。"のみが表示されている時', () => {
  //     test('登録済みのパスワードと登録済みのユーザーIDが入力されている場合、"※正しいユーザーIDを入力してください。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
  //       // 登録されていないユーザーIDを入力
  //       const userIdInput = screen.getByLabelText('ユーザーID');
  //       await userEvent.type(userIdInput, `${notRegisteredUser.id}`);

  //       // 登録済みパスワードを入力
  //       const passwordInput = screen.getByLabelText('パスワード');
  //       await userEvent.type(passwordInput, `${registeredUser.password}`);

  //       // 初めてボタンをクリック
  //       const loginButton = screen.getByRole('button', { name: 'ログイン' });
  //       await user.click(loginButton);

  //       // エラーメッセージが表示されている
  //       expect(
  //         await screen.findByText('※正しいユーザーIDを入力してください。')
  //       ).toBeInTheDocument();

  //       // 入力した値を削除
  //       await userEvent.clear(userIdInput);
  //       // 登録済みユーザーIDを入力;
  //       await userEvent.type(userIdInput, `${registeredUser.id}`);

  //       // ボタンをクリック（2回目）
  //       await user.click(loginButton);

  //       // エラーメッセージが消えたことを確認
  //       expect(
  //         await waitFor(() =>
  //           screen.queryByText('※正しいユーザーIDを入力してください。')
  //         )
  //       ).toBeNull();

  //       // トップ画面へ遷移
  //       expect(push).toHaveBeenCalledWith('/');
  //     });
  //   });

  //   describe('"※パスワードを入力してください"のみが表示されている時', () => {
  //     test('登録済みのユーザーIDと登録済みのパスワードが入力されている場合、"※パスワードを入力してください。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
  //       // 登録済みユーザーIDを入力;
  //       const userIdInput = screen.getByLabelText('ユーザーID');
  //       await userEvent.type(userIdInput, `${registeredUser.id}`);

  //       // 初めてボタンをクリック
  //       const loginButton = screen.getByRole('button', { name: 'ログイン' });
  //       await user.click(loginButton);

  //       // エラーメッセージが表示されている
  //       expect(
  //         await screen.findByText('※パスワードを入力してください。')
  //       ).toBeInTheDocument();

  //       // 登録済みパスワードを入力;
  //       const passwordInput = screen.getByLabelText('パスワード');
  //       await userEvent.type(passwordInput, `${registeredUser.password}`);

  //       // ボタンをクリック（2回目）
  //       await user.click(loginButton);

  //       // エラーメッセージが消えたことを確認
  //       expect(
  //         await waitFor(() =>
  //           screen.queryByText('※パスワードを入力してください。')
  //         )
  //       ).toBeNull();

  //       // トップ画面へ遷移
  //       expect(push).toHaveBeenCalledWith('/');
  //     });
  //   });

  //   describe('"※正しいパスワードを入力してください。"のみが表示されている時', () => {
  //     test('登録済みのユーザーIDと登録済みのパスワードが入力されている場合、"※正しいパスワードを入力してください。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
  //       // 登録済みユーザーIDを入力;
  //       const userIdInput = screen.getByLabelText('ユーザーID');
  //       await userEvent.type(userIdInput, `${registeredUser.id}`);

  //       // 登録されていないパスワードを入力
  //       const passwordInput = screen.getByLabelText('パスワード');
  //       await userEvent.type(passwordInput, `${notRegisteredUser.password}`);

  //       // 初めてボタンをクリック
  //       const loginButton = screen.getByRole('button', { name: 'ログイン' });
  //       await user.click(loginButton);

  //       // エラーメッセージが表示されている
  //       expect(
  //         await screen.findByText('※正しいパスワードを入力してください。')
  //       ).toBeInTheDocument();

  //       // 入力した値を削除
  //       await userEvent.clear(passwordInput);
  //       // 登録済みパスワードを入力;
  //       await userEvent.type(passwordInput, `${registeredUser.password}`);

  //       // ボタンをクリック（2回目）
  //       await user.click(loginButton);

  //       // エラーメッセージが消えたことを確認
  //       expect(
  //         await waitFor(() =>
  //           screen.queryByText('※正しいパスワードを入力してください。')
  //         )
  //       ).toBeNull();

  //       // トップ画面へ遷移
  //       expect(push).toHaveBeenCalledWith('/');
  //     });
  //   });
});
