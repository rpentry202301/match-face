import LoginPage from '@/app/(pages)/(general)/login/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock';
import Input from '@/components/ui/Input';

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
    await userEvent.type(userIdInput, 'testUser');
    screen.debug(userIdInput);

    // パスワードを入力
    const passwordInput = screen.getByLabelText('パスワード');
    screen.debug(passwordInput);
    await userEvent.type(passwordInput, 'testPassword');
    screen.debug(passwordInput);

    // expect(userIdInputValue).toBe('testUser');
  });
});
