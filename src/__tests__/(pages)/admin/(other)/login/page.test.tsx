import AdminLoginPage from '@/app/(pages)/admin/login/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock';
import users from '@/const/login';

const user = userEvent.setup();

describe('AdminLoginPageのテスト', () => {
  const push = jest.fn();

  render(
    <AppRouterContextProviderMock router={{ push }}>
      <AdminLoginPage />
    </AppRouterContextProviderMock>
  );

  test('ログインに成功するか確認', () => {});
});
