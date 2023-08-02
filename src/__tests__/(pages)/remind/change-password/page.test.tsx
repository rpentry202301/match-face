import ChangePasswordPage from '@/app/(pages)/remind/change-password/page';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock';
import {
  dummyPasswords,
  correctPassword,
  incorrectPassword,
  anyPassword,
} from '@/const/change-password';

// モック
const push = jest.fn();
window.alert = jest.fn();

// ユーザーイベント
const user = userEvent.setup();

describe('スナップショット', () => {
  test('スナップショット', () => {
    const { container } = render(
      <AppRouterContextProviderMock router={{ push }}>
        <ChangePasswordPage />
      </AppRouterContextProviderMock>
    );
    expect(container).toMatchSnapshot();
  });
});

describe('初めてOrangeButtonがクリックされた時', () => {
  describe('新しいパスワードが未入力の時', () => {
    beforeEach(() => {
      render(
        <AppRouterContextProviderMock router={{ push }}>
          <ChangePasswordPage />
        </AppRouterContextProviderMock>
      );
    });
    test('確認用パスワードが未入力の場合、"※パスワードを入力してください。"と、"※確認用パスワードを入力してください。"が表示されること', async () => {
      const registerButton = screen.getByRole('button', { name: '登録' });
      await user.click(registerButton);

      // エラーメッセージ
      expect(
        await screen.findByText('※パスワードを入力してください。')
      ).toBeInTheDocument();
      expect(
        await screen.findByText('※確認用パスワードを入力してください。')
      ).toBeInTheDocument();
    });
  });

  describe('パスワードの条件に一致した、新しいパスワードが入力されている時', () => {
    beforeEach(() => {
      render(
        <AppRouterContextProviderMock router={{ push }}>
          <ChangePasswordPage />
        </AppRouterContextProviderMock>
      );
    });

    test('確認用パスワードが未入力の場合、"※確認用パスワードを入力してください。"が表示されること', async () => {
      // 条件に一致したパスワードを入力
      const newPasswordInput = screen.getByLabelText('新しいパスワード');
      await user.type(newPasswordInput, `${correctPassword}`);

      const registerButton = screen.getByRole('button', { name: '登録' });
      await user.click(registerButton);

      //  エラーメッセージ
      expect(
        await screen.findByText('※確認用パスワードを入力してください。')
      ).toBeInTheDocument();
    });

    test('確認用パスワードを入力し、新しいパスワードと確認用パスワードが一致しない場合、"※パスワードと確認用パスワードが一致しません。"が表示されること', async () => {
      // 条件に一致したパスワードを入力
      const newPasswordInput = screen.getByLabelText('新しいパスワード');
      await user.type(newPasswordInput, `${correctPassword}`);

      const confirmPasswordInput =
        screen.getByLabelText('新しいパスワード（確認用）');
      await user.type(confirmPasswordInput, `${incorrectPassword}`);

      const registerButton = screen.getByRole('button', { name: '登録' });
      await user.click(registerButton);

      //   エラーメッセージ
      expect(
        await screen.findByText('※パスワードと確認用パスワードが一致しません。')
      ).toBeInTheDocument();
    });

    test('確認用パスワードを入力し、新しいパスワードと確認用パスワードが一致した場合、"パスワードが変更されました。"のアラートが表示され、一般ログイン画面に遷移すること', async () => {
      // 条件に一致したパスワードを入力
      const newPasswordInput = screen.getByLabelText('新しいパスワード');
      await user.type(newPasswordInput, `${correctPassword}`);
      // 確認用パスワードが一致
      const confirmPasswordInput =
        screen.getByLabelText('新しいパスワード（確認用）');
      await user.type(confirmPasswordInput, `${correctPassword}`);

      const registerButton = screen.getByRole('button', { name: '登録' });
      await user.click(registerButton);

      //   アラートと遷移
      expect(window.alert).toHaveBeenCalledWith('パスワードが変更されました。');
      expect(push).toHaveBeenCalledWith('/login');
    });
  });

  describe('新しいパスワードと確認用パスワードが一致している時', () => {
    beforeEach(() => {
      render(
        <AppRouterContextProviderMock router={{ push }}>
          <ChangePasswordPage />
        </AppRouterContextProviderMock>
      );
    });
    describe('半角英字のみで入力されている時', () => {
      test('入力値が7文字の時、"※パスワードの条件を満たしていません。"と表示されること', async () => {
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(
          newPasswordInput,
          `${dummyPasswords.halfSizeEng.seven}`
        );

        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(
          confirmPasswordInput,
          `${dummyPasswords.halfSizeEng.seven}`
        );

        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);

        // エラーメッセージ
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        ).toBeInTheDocument();
      });

      test('入力値が8文字の時、"※パスワードの条件を満たしていません。"と表示されること', async () => {
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(
          newPasswordInput,
          `${dummyPasswords.halfSizeEng.eight}`
        );

        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(
          confirmPasswordInput,
          `${dummyPasswords.halfSizeEng.eight}`
        );

        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);

        // エラーメッセージ
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        ).toBeInTheDocument();
      });

      test('入力値が9文字の時、"※パスワードの条件を満たしていません。"と表示されること', async () => {
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(newPasswordInput, `${dummyPasswords.halfSizeEng.nine}`);

        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(
          confirmPasswordInput,
          `${dummyPasswords.halfSizeEng.nine}`
        );

        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);

        // エラーメッセージ
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        ).toBeInTheDocument();
      });
    });

    describe('数字のみで入力されている時', () => {
      test('入力値が7文字の時、"※パスワードの条件を満たしていません。"と表示されること', async () => {
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(
          newPasswordInput,
          `${dummyPasswords.halfSizeNum.seven}`
        );

        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(
          confirmPasswordInput,
          `${dummyPasswords.halfSizeNum.seven}`
        );

        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);

        // エラーメッセージ
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        ).toBeInTheDocument();
      });
      test('入力値が8文字の時、"※パスワードの条件を満たしていません。"と表示されること', async () => {
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(
          newPasswordInput,
          `${dummyPasswords.halfSizeNum.eight}`
        );

        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(
          confirmPasswordInput,
          `${dummyPasswords.halfSizeNum.eight}`
        );

        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);

        // エラーメッセージ
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        ).toBeInTheDocument();
      });
      test('入力値が9文字の時、"※パスワードの条件を満たしていません。"と表示されること', async () => {
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(newPasswordInput, `${dummyPasswords.halfSizeNum.nine}`);

        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(
          confirmPasswordInput,
          `${dummyPasswords.halfSizeNum.nine}`
        );

        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);

        // エラーメッセージ
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        ).toBeInTheDocument();
      });
    });

    describe('半角英字と数字のみで入力されている時', () => {
      test('入力値が7文字の時、"※パスワードの条件を満たしていません。"と表示されること', async () => {
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(
          newPasswordInput,
          `${dummyPasswords.halfSizeEngNum.seven}`
        );

        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(
          confirmPasswordInput,
          `${dummyPasswords.halfSizeEngNum.seven}`
        );

        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);

        // エラーメッセージ
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        ).toBeInTheDocument();
      });

      test('入力値が8文字の時、"※パスワードの条件を満たしていません。"と表示されること', async () => {
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(
          newPasswordInput,
          `${dummyPasswords.halfSizeEngNum.eight}`
        );

        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(
          confirmPasswordInput,
          `${dummyPasswords.halfSizeEngNum.eight}`
        );

        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);

        // エラーメッセージ
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        ).toBeInTheDocument();
      });

      test('入力値が9文字の時、"※パスワードの条件を満たしていません。"と表示されること', async () => {
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(
          newPasswordInput,
          `${dummyPasswords.halfSizeEngNum.nine}`
        );

        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(
          confirmPasswordInput,
          `${dummyPasswords.halfSizeEngNum.nine}`
        );

        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);

        // エラーメッセージ
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        ).toBeInTheDocument();
      });
    });

    describe('半角数字と記号のみで入力されている時', () => {
      test('入力値が7文字の時、"※パスワードの条件を満たしていません。"と表示されること', async () => {
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(
          newPasswordInput,
          `${dummyPasswords.halfSizeNumSymb.seven}`
        );

        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(
          confirmPasswordInput,
          `${dummyPasswords.halfSizeNumSymb.seven}`
        );

        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);

        // エラーメッセージ
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        ).toBeInTheDocument();
      });

      test('入力値が8文字の時、"※パスワードの条件を満たしていません。"と表示されること', async () => {
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(
          newPasswordInput,
          `${dummyPasswords.halfSizeNumSymb.eight}`
        );

        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(
          confirmPasswordInput,
          `${dummyPasswords.halfSizeNumSymb.eight}`
        );

        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);

        // エラーメッセージ
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        ).toBeInTheDocument();
      });

      test('入力値が9文字の時、"※パスワードの条件を満たしていません。"と表示されること', async () => {
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(
          newPasswordInput,
          `${dummyPasswords.halfSizeNumSymb.nine}`
        );

        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(
          confirmPasswordInput,
          `${dummyPasswords.halfSizeNumSymb.nine}`
        );

        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);

        // エラーメッセージ
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        ).toBeInTheDocument();
      });
    });
  });
});

describe('エラーメッセージが表示されている時', () => {
  beforeEach(() => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <ChangePasswordPage />
      </AppRouterContextProviderMock>
    );
  });
  describe('"※パスワードを入力してください。"と"※確認用パスワードを入力してください。"が表示されている時', () => {
    describe('条件に合致したパスワードと確認用パスワードを入力し、入力したパスワードと確認用パスワードが一致している時', () => {
      test('"パスワードが変更されました。"のアラートが表示され、エラーメッセージが消え、一般ログイン画面に遷移すること', async () => {
        // エラーメッセージの表示
        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);
        expect(await screen.findByText('※パスワードを入力してください。'));
        expect(
          await screen.findByText('※確認用パスワードを入力してください。')
        );

        // 条件に合致したパスワードと確認用パスワードの入力
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(newPasswordInput, `${correctPassword}`);
        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(confirmPasswordInput, `${correctPassword}`);

        // 登録ボタンのクリック(2回目)
        await user.click(registerButton);

        // アラート
        expect(window.alert).toHaveBeenCalledWith(
          'パスワードが変更されました。'
        );
        // エラーメッセージが消えている
        expect(
          await waitFor(() =>
            screen.queryByText('※パスワードを入力してください。')
          )
        ).toBeNull();
        expect(
          await waitFor(() =>
            screen.queryByText('※確認用パスワードを入力してください。')
          )
        ).toBeNull();
      });
    });
  });

  describe('※パスワードの条件を満たしていません。"と、"※確認用パスワードを入力してください。"が表示されている時', () => {
    describe('条件に合致したパスワードと確認用パスワードを入力し、入力したパスワードと確認用パスワードが一致している時', () => {
      test('"パスワードが変更されました。"のアラートが表示され、エラーメッセージが消え、一般ログイン画面に遷移すること', async () => {
        // エラーメッセージの表示
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(newPasswordInput, `${incorrectPassword}`);
        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        );
        expect(
          await screen.findByText('※確認用パスワードを入力してください。')
        );

        // 条件に合致したパスワードと確認用パスワードの入力
        await user.type(newPasswordInput, `${correctPassword}`);
        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(confirmPasswordInput, `${correctPassword}`);

        // 登録ボタンのクリック(2回目)
        await user.click(registerButton);

        // アラート
        expect(window.alert).toHaveBeenCalledWith(
          'パスワードが変更されました。'
        );
        // エラーメッセージが消えている
        expect(
          await waitFor(() =>
            screen.queryByText('※パスワードの条件を満たしていません。')
          )
        ).toBeNull();
        expect(
          await waitFor(() =>
            screen.queryByText('※確認用パスワードを入力してください。')
          )
        ).toBeNull();
      });
    });
  });

  describe('"※パスワードの条件を満たしていません。"と、"※パスワードと確認用パスワードが一致しません。"が表示されている時', () => {
    describe('条件に合致したパスワードと確認用パスワードを入力し、入力したパスワードと確認用パスワードが一致している時', () => {
      test('"パスワードが変更されました。"のアラートが表示され、エラーメッセージが消え、一般ログイン画面に遷移すること', async () => {
        // エラーメッセージの表示
        const newPasswordInput = screen.getByLabelText('新しいパスワード');
        await user.type(newPasswordInput, `${incorrectPassword}`);

        const confirmPasswordInput =
          screen.getByLabelText('新しいパスワード（確認用）');
        await user.type(confirmPasswordInput, `${anyPassword}`);

        const registerButton = screen.getByRole('button', { name: '登録' });
        await user.click(registerButton);
        expect(
          await screen.findByText('※パスワードの条件を満たしていません。')
        );
        expect(
          await screen.findByText(
            '※パスワードと確認用パスワードが一致しません。'
          )
        );
        // 条件に合致したパスワードと確認用パスワードの入力
        await user.clear(newPasswordInput);
        await user.type(newPasswordInput, `${correctPassword}`);
        await user.clear(confirmPasswordInput);
        await user.type(confirmPasswordInput, `${correctPassword}`);

        // 登録ボタンのクリック(2回目)
        await user.click(registerButton);

        // アラート
        expect(window.alert).toHaveBeenCalledWith(
          'パスワードが変更されました。'
        );
        // エラーメッセージが消えている
        expect(
          await waitFor(() =>
            screen.queryByText('※パスワードの条件を満たしていません。')
          )
        ).toBeNull();
        expect(
          await waitFor(() =>
            screen.queryByText('※パスワードと確認用パスワードが一致しません。')
          )
        ).toBeNull();
      });
    });
  });
});
