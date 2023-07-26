import RemindPage from '@/app/(pages)/remind/page';
import { findByText, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock';
import { dummyUser, users } from '@/const/login';

const push = jest.fn();
const user = userEvent.setup();

// alertのモック（修正するかも）

window.alert = jest.fn();

// ダミーデータ
const registeredUser = users[0];
const notRegisteredUser = dummyUser[0];

describe('スナップショット', () => {
  test('スナップショット', () => {
    const { container } = render(
      <AppRouterContextProviderMock router={{ push }}>
        <RemindPage />
      </AppRouterContextProviderMock>
    );
    expect(container).toMatchSnapshot();
  });
});

describe('ページがレンダリングされた時 ', () => {
  beforeEach(() => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <RemindPage />
      </AppRouterContextProviderMock>
    );
  });
  test('"一般ログイン"のリンクのurlが"/login"であること', () => {
    const loginLink = screen.getByRole('link', { name: '一般ログイン' });
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});

describe('初めてOrangeButtonがクリックされた時', () => {
  beforeEach(() => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <RemindPage />
      </AppRouterContextProviderMock>
    );
  });

  describe('メールアドレスが未入力の時', () => {
    test('"※メールアドレスを入力してください。"が表示されること。', async () => {
      const sendButton = screen.getByRole('button', {
        name: '再設定用メール送信',
      });
      await user.click(sendButton);
      expect(await screen.findByText('※メールアドレスを入力してください。'));
    });
  });

  describe('登録されていないメールアドレスが入力されている時', () => {
    test('"※入力されたメールアドレスが正しくありません。"が表示されること。', async () => {
      const emailInput = screen.getByLabelText('メールアドレス');
      await user.type(emailInput, `${notRegisteredUser.email}`);

      const sendButton = screen.getByRole('button', {
        name: '再設定用メール送信',
      });
      await user.click(sendButton);

      expect(
        await screen.findByText('※入力されたメールアドレスが正しくありません。')
      );
    });
  });
});

describe('エラーメッセージが表示されている時', () => {
  beforeEach(() => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <RemindPage />
      </AppRouterContextProviderMock>
    );
  });

  describe('"※メールアドレスを入力してください。"が表示されている時', () => {
    test('登録されているメールアドレスが入力されている場合、"リマインドメールが送信されました。"のアラートが表示、"※メールアドレスを入力してください。"が消えログイン画面に遷移すること', async () => {
      // エラーメッセージの表示
      const sendButton = screen.getByRole('button', {
        name: '再設定用メール送信',
      });
      await user.click(sendButton);
      expect(await screen.findByText('※メールアドレスを入力してください。'));

      // 登録されているメールアドレスを入力
      const emailInput = screen.getByLabelText('メールアドレス');
      await user.type(emailInput, `${registeredUser.email}`);
      // ボタンをクリック（2回目）
      await user.click(sendButton);

      // アラートが表示
      expect(window.alert).toHaveBeenCalledWith(
        'リマインドメールが送信されました。'
      );

      // メッセージが消えている
      expect(
        await waitFor(() =>
          screen.queryByText('※メールアドレスを入力してください。')
        )
      ).toBeNull();

      // 一般ログイン画面へ遷移
      expect(push).toHaveBeenCalledWith('/login');
    });

    test('登録されていないメールアドレスが入力されている場合、"※メールアドレスを入力してください。"が消え、"※入力されたメールアドレスが正しくありません。"が表示されること', async () => {
      // エラーメッセージの表示
      const sendButton = screen.getByRole('button', {
        name: '再設定用メール送信',
      });
      await user.click(sendButton);
      expect(await screen.findByText('※メールアドレスを入力してください。'));

      // 登録されていないメールアドレスを入力
      const emailInput = screen.getByLabelText('メールアドレス');
      await user.type(emailInput, `${notRegisteredUser.email}`);

      await user.click(sendButton);

      // エラーメッセージが切り替わる
      expect(
        await waitFor(() => {
          screen.queryByText('※メールアドレスを入力してください。');
        })
      ).toBeUndefined();
      expect(
        await screen.findByText('※入力されたメールアドレスが正しくありません。')
      );
    });
  });

  describe('"※入力されたメールアドレスが正しくありません。"が表示されている時', () => {
    test('登録されているメールアドレスが入力されている場合、"※入力されたメールアドレスが正しくありません。"が消え、ログイン画面に遷移すること', async () => {
      // エラーメッセージの表示
      const emailInput = screen.getByLabelText('メールアドレス');
      await user.type(emailInput, `${notRegisteredUser.email}`);

      const sendButton = screen.getByRole('button', {
        name: '再設定用メール送信',
      });
      await user.click(sendButton);
      expect(
        await screen.findByText('※入力されたメールアドレスが正しくありません。')
      );

      // 登録されているメールアドレスを入力
      await user.clear(emailInput);
      await user.type(emailInput, `${registeredUser.email}`);

      await user.click(sendButton);

      // アラートが表示
      expect(window.alert).toHaveBeenCalledWith(
        'リマインドメールが送信されました。'
      );

      // メッセージが消えている
      expect(
        await waitFor(() =>
          screen.queryByText('※入力されたメールアドレスが正しくありません。')
        )
      ).toBeNull();

      // 一般ログイン画面へ遷移
      expect(push).toHaveBeenCalledWith('/login');
    });
  });
});
