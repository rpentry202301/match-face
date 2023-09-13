import Top from '@/app/(pages)/(general)/(other)/(top)/page';
import { render, screen, waitFor } from '@testing-library/react';
import { menuDataMock } from '@/__tests__/components/pages/general/top/top-data-mock';
import { cookies } from 'next/headers';

// describe('ユーザートップページのテスト', () => {
//   test('fetchが呼ばれていること', async () => {
//     global.fetch = jest.fn().mockImplementation(menuDataMock);

//     jest.mock('next/headers', () => ({
//       cookies: jest.fn(),
//     }));
//     // cookies.mockImplementation(() => ({ get: () => '1' }));
//     render(<Top />);
//     // await waitFor(() => {
//     expect(fetch).toBeCalledTimes(1);
//     // });
//   });
// });
