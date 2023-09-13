import Top from '@/app/(pages)/(general)/(other)/(top)/page';
import { render, screen, waitFor } from '@testing-library/react';
import { menuDataMock } from '@/__tests__/components/pages/general/top/top-data-mock';
import { cookies } from 'next/headers';
import { menuContentsArray } from '@/__tests__/components/pages/general/top/Menu.test';

const menuData = menuContentsArray;

describe('ユーザートップページのテスト', () => {
  test('fetchが呼ばれていること', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return {
        ok: true,
        // status: 200,
        json: async () => ({ data: { menuData } }),
      };
    });

    // cookies.mockImplementation(() => ({ get: () => '1' }));
    await waitFor(() => {
      expect(fetch).toBeCalledTimes(1);
    });
  });
});
