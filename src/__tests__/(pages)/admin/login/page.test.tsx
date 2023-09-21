import AdminLoginPage from '@/app/(pages)/admin/login/page';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock';
import { admin, dummyAdmin } from '@/const/login';

const push = jest.fn();
const user = userEvent.setup();

// ダミーデータ
const registeredAdmin = admin[0];
const notRegisteredAdmin = dummyAdmin[0];

// describe('スナップショット', () => {
//   test('スナップショット', () => {
//     const { container } = render(
//       <AppRouterContextProviderMock router={{ push }}>
//         <AdminLoginPage />
//       </AppRouterContextProviderMock>
//     );
//     expect(container).toMatchSnapshot();
//   });
// });

describe('ページがレンダリングされた時', () => {
  beforeEach(() => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AdminLoginPage />
      </AppRouterContextProviderMock>
    );
  });

  // test('"パスワードを忘れた"のリンクのurlが"/remind"であること', () => {
  //   //"パスワードを忘れた"のリンク
  //   const remindLink = screen.getByRole('link', { name: 'パスワードを忘れた' });
  //   expect(remindLink).toHaveAttribute('href', '/remind');
  // });

  test('"一般ログイン"のリンクのurlが"/login"であること', () => {
    // "一般ログイン"のリンク
    const userLoginLink = screen.getByRole('link', { name: '一般ログイン' });
    expect(userLoginLink).toHaveAttribute('href', '/login');
  });
});

// describe('初めてOrangeButtonがクリックされた時', () => {
//   beforeEach(() => {
//     render(
//       <AppRouterContextProviderMock router={{ push }}>
//         <AdminLoginPage />
//       </AppRouterContextProviderMock>
//     );
//   });

//   describe('ユーザーIDが未入力の時', () => {
//     test('パスワードが未入力の場合、"※ユーザーIDを入力してください。"と、"※パスワードを入力してください。"が表示されること', async () => {
//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※ユーザーIDを入力してください。')
//       ).toBeInTheDocument();
//       expect(
//         await screen.findByText('※パスワードを入力してください。')
//       ).toBeInTheDocument();
//     });
//     test('登録済みのパスワードが入力されている場合、”※ユーザーIDを入力してください。”が表示されること', async () => {
//       // 登録済みのパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${registeredAdmin.password}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※ユーザーIDを入力してください。')
//       ).toBeInTheDocument();
//     });

//     test('登録されていないパスワードが入力されている場合、"※ユーザーIDを入力してください。"と、"正しいパスワードを入力してください。"が表示されること', async () => {
//       // 登録されていないパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${notRegisteredAdmin.password}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※ユーザーIDを入力してください。')
//       ).toBeInTheDocument();
//       expect(
//         await screen.findByText('※正しいパスワードを入力してください。')
//       ).toBeInTheDocument();
//     });
//   });

//   describe('ユーザーIDが全角数字のみで入力されている時', () => {
//     test('パスワードが未入力の場合、"※半角数字で入力してください。"と、"※パスワードを入力してください"が表示されること', async () => {
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       // ユーザーIDを全角数字のみで入力
//       await userEvent.type(userIdInput, '１１１１');

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※半角数字で入力してください。')
//       ).toBeInTheDocument();
//       expect(
//         await screen.findByText('※パスワードを入力してください。')
//       ).toBeInTheDocument();
//     });

//     test('登録済みのパスワードが入力されている場合、"※半角数字で入力してください。"が表示されること', async () => {
//       // ユーザーIDを全角数字のみで入力
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, '１１１１');

//       // 登録済みのパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${registeredAdmin.password}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※半角数字で入力してください。')
//       ).toBeInTheDocument();
//     });
//     test('登録されていないパスワードが入力されている場合、"※半角数字で入力してください。"と、”正しいパスワードを入力してください。"が表示されること', async () => {
//       // ユーザーIDを全角数字のみで入力
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, '１１１１');

//       // 登録されていないパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${notRegisteredAdmin.password}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※半角数字で入力してください。')
//       ).toBeInTheDocument();
//       expect(
//         await screen.findByText('※正しいパスワードを入力してください。')
//       ).toBeInTheDocument();
//     });
//   });

//   describe('ユーザーIDが半角英語のみで入力されている時', () => {
//     test('パスワードが未入力の場合、"※半角数字で入力してください。"と、"※パスワードを入力してください"が表示されること', async () => {
//       // ユーザーIDを半角英語のみで入力
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, 'aaaa');

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※半角数字で入力してください。')
//       ).toBeInTheDocument();
//       expect(
//         await screen.findByText('※パスワードを入力してください。')
//       ).toBeInTheDocument();
//     });

//     test('登録済みのパスワードが入力されている場合、"※半角数字で入力してください。"が表示されること', async () => {
//       // ユーザーIDを半角英語のみで入力
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, 'aaaa');

//       // 登録済みのパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${registeredAdmin.password}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※半角数字で入力してください。')
//       ).toBeInTheDocument();
//     });

//     test('登録されていないパスワードが入力されている場合、"※半角数字で入力してください。"と、”正しいパスワードを入力してください。"が表示されること', async () => {
//       // ユーザーIDを半角英語のみで入力
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, 'aaaa');

//       // 登録されていないパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${notRegisteredAdmin.password}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※半角数字で入力してください。')
//       ).toBeInTheDocument();
//       expect(
//         await screen.findByText('※正しいパスワードを入力してください。')
//       ).toBeInTheDocument();
//     });
//   });

//   describe('ユーザーIDが半角英語と半角数字で入力されている時', () => {
//     test('パスワードが未入力の場合、"※半角数字で入力してください。"と、"※パスワードを入力してください"が表示されること', async () => {
//       // ユーザーIDを半角英語と半角数字で入力
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, '111a');

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※半角数字で入力してください。')
//       ).toBeInTheDocument();
//       expect(
//         await screen.findByText('※パスワードを入力してください。')
//       ).toBeInTheDocument();
//     });

//     test('登録済みのパスワードが入力されている場合、"※半角数字で入力してください。"が表示されること', async () => {
//       // ユーザーIDを半角英語と半角数字で入力
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, '111a');

//       // 登録済みのパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${registeredAdmin.password}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※半角数字で入力してください。')
//       ).toBeInTheDocument();
//     });

//     test('登録されていないパスワードが入力されている場合、"※半角数字で入力してください。"と、”正しいパスワードを入力してください。"が表示されること', async () => {
//       // ユーザーIDを半角英語と半角数字で入力
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, '111a');

//       // 登録されていないパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${notRegisteredAdmin.password}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※半角数字で入力してください。')
//       ).toBeInTheDocument();
//       expect(
//         await screen.findByText('※正しいパスワードを入力してください。')
//       ).toBeInTheDocument();
//     });
//   });

//   describe('登録されているユーザーIDが入力されている時', () => {
//     test('パスワードが未入力の場合、"※パスワードを入力してください"が表示されること', async () => {
//       // 登録されているユーザーIDを入力
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, `${registeredAdmin.id}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※パスワードを入力してください。')
//       ).toBeInTheDocument();
//     });
//     test('登録済みのパスワードが入力されている場合、ログインに成功し管理者トップ画面に遷移すること', async () => {
//       // 登録済みユーザーIDを入力;
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, `${registeredAdmin.id}`);

//       // 登録済みパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${registeredAdmin.password}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // 管理者トップ画面へ遷移
//       expect(push).toHaveBeenCalledWith('/admin');
//     });
//     test('登録されていないパスワードが入力されている場合、”正しいパスワードを入力してください。"が表示されること', async () => {
//       // 登録済みユーザーIDを入力;
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, `${registeredAdmin.id}`);

//       // 登録されていないパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${notRegisteredAdmin.password}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※正しいパスワードを入力してください。')
//       ).toBeInTheDocument();
//     });
//   });

//   describe('ユーザーIDが半角数字のみで入力されているが、登録されていない時', () => {
//     test('パスワードが未入力の場合、"※正しいユーザーIDを入力してください。"と、"※パスワードを入力してください"が表示されること', async () => {
//       // 半角数字のみだが登録されていないユーザーIDを入力(99999)
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, `${notRegisteredAdmin.id}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※正しいユーザーIDを入力してください。')
//       ).toBeInTheDocument();
//       expect(
//         await screen.findByText('※パスワードを入力してください。')
//       ).toBeInTheDocument();
//     });
//     test('登録済みのパスワードが入力されている場合、"※正しいユーザーIDを入力してください。"が表示されること', async () => {
//       // 半角数字のみだが登録されていないユーザーIDを入力(99999)
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, `${notRegisteredAdmin.id}`);

//       // 登録済みパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${registeredAdmin.password}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※正しいユーザーIDを入力してください。')
//       ).toBeInTheDocument();
//     });
//     test('登録されていないパスワードが入力されている場合、"※正しいユーザーIDを入力してください。"と、正しいパスワードを入力してください。”が表示されること', async () => {
//       // 半角数字のみだが登録されていないユーザーIDを入力(99999)
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, `${notRegisteredAdmin.id}`);

//       // 登録されていないパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${notRegisteredAdmin.password}`);

//       // ボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示される
//       expect(
//         await screen.findByText('※正しいユーザーIDを入力してください。')
//       ).toBeInTheDocument();
//       expect(
//         await screen.findByText('※正しいパスワードを入力してください。')
//       ).toBeInTheDocument();
//     });
//   });
// });

// describe('OrangeButtonがクリックされた時（2回目以降）', () => {
//   beforeEach(() => {
//     render(
//       <AppRouterContextProviderMock router={{ push }}>
//         <AdminLoginPage />
//       </AppRouterContextProviderMock>
//     );
//   });

//   describe('"※ユーザーIDを入力してください。"のみが表示されている時', () => {
//     test('登録済みのパスワードと登録済みのユーザーIDが入力されている場合、"※ユーザーIDを入力してください。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
//       // 登録済みパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${registeredAdmin.password}`);

//       // 初めてボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示されている
//       expect(
//         await screen.findByText('※ユーザーIDを入力してください。')
//       ).toBeInTheDocument();

//       // 登録済みユーザーIDを入力;
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, `${registeredAdmin.id}`);

//       // ボタンをクリック（2回目）
//       await user.click(loginButton);

//       // エラーメッセージが消えたことを確認
//       expect(
//         await waitFor(() =>
//           screen.queryByText('※ユーザーIDを入力してください。')
//         )
//       ).toBeNull();

//       // トップ画面へ遷移
//       expect(push).toHaveBeenCalledWith('/admin');
//     });
//   });

//   describe('"※半角数字で入力してください"のみが表示されている時', () => {
//     test('登録済みのパスワードと登録済みのユーザーIDが入力されている場合、"※半角数字で入力してください。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
//       // ユーザーIDを半角英語で入力
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, 'aaaa');

//       // 登録済みパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${registeredAdmin.password}`);

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
//       await userEvent.type(userIdInput, `${registeredAdmin.id}`);

//       // ボタンをクリック（2回目）
//       await user.click(loginButton);

//       // エラーメッセージが消えたことを確認
//       expect(
//         await waitFor(() => screen.queryByText('※半角数字で入力してください。'))
//       ).toBeNull();

//       // トップ画面へ遷移
//       expect(push).toHaveBeenCalledWith('/admin');
//     });
//   });

//   describe('"※正しいユーザーIDを入力してください。"のみが表示されている時', () => {
//     test('登録済みのパスワードと登録済みのユーザーIDが入力されている場合、"※正しいユーザーIDを入力してください。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
//       // 登録されていないユーザーIDを入力
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, `${notRegisteredAdmin.id}`);

//       // 登録済みパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${registeredAdmin.password}`);

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
//       await userEvent.type(userIdInput, `${registeredAdmin.id}`);

//       // ボタンをクリック（2回目）
//       await user.click(loginButton);

//       // エラーメッセージが消えたことを確認
//       expect(
//         await waitFor(() =>
//           screen.queryByText('※正しいユーザーIDを入力してください。')
//         )
//       ).toBeNull();

//       // トップ画面へ遷移
//       expect(push).toHaveBeenCalledWith('/admin');
//     });
//   });

//   describe('"※パスワードを入力してください"のみが表示されている時', () => {
//     test('登録済みのユーザーIDと登録済みのパスワードが入力されている場合、"※パスワードを入力してください。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
//       // 登録済みユーザーIDを入力;
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, `${registeredAdmin.id}`);

//       // 初めてボタンをクリック
//       const loginButton = screen.getByRole('button', { name: 'ログイン' });
//       await user.click(loginButton);

//       // エラーメッセージが表示されている
//       expect(
//         await screen.findByText('※パスワードを入力してください。')
//       ).toBeInTheDocument();

//       // 登録済みパスワードを入力;
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${registeredAdmin.password}`);

//       // ボタンをクリック（2回目）
//       await user.click(loginButton);

//       // エラーメッセージが消えたことを確認
//       expect(
//         await waitFor(() =>
//           screen.queryByText('※パスワードを入力してください。')
//         )
//       ).toBeNull();

//       // トップ画面へ遷移
//       expect(push).toHaveBeenCalledWith('/admin');
//     });
//   });

//   describe('"※正しいパスワードを入力してください。"のみが表示されている時', () => {
//     test('登録済みのユーザーIDと登録済みのパスワードが入力されている場合、"※正しいパスワードを入力してください。"の表示が消え、ログインに成功しトップ画面に遷移すること', async () => {
//       // 登録済みユーザーIDを入力;
//       const userIdInput = screen.getByLabelText('ユーザーID');
//       await userEvent.type(userIdInput, `${registeredAdmin.id}`);

//       // 登録されていないパスワードを入力
//       const passwordInput = screen.getByLabelText('パスワード');
//       await userEvent.type(passwordInput, `${notRegisteredAdmin.password}`);

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
//       await userEvent.type(passwordInput, `${registeredAdmin.password}`);

//       // ボタンをクリック（2回目）
//       await user.click(loginButton);

//       // エラーメッセージが消えたことを確認
//       expect(
//         await waitFor(() =>
//           screen.queryByText('※正しいパスワードを入力してください。')
//         )
//       ).toBeNull();

//       // トップ画面へ遷移
//       expect(push).toHaveBeenCalledWith('/admin');
//     });
//   });
// });
