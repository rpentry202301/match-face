import AdminLoginPage from '@/app/(pages)/admin/login/page';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { AppRouterContextProviderMock } from '@/__tests__/test_utils/app-router-context-provider-mock';
import { admin, dummyAdmin, users } from '@/const/login';

const push = jest.fn();
const user = userEvent.setup();

// ダミーデータ
const registeredAdmin = admin[0];
const notRegisteredAdmin = dummyAdmin[0];
