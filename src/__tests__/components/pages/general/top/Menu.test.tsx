import Menu from '@/components/pages/general/top/Menu';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { menuContentsArray } from '@/const/menu';

// ダミーデータ
const menuContent = menuContentsArray[0];

describe('スナップショット', () => {
  test('スナップショット', () => {
    const { container } = render(
      <Menu
        url={menuContent.url}
        title={menuContent.title}
        description={menuContent.description}
        imgUrl={menuContent.imgUrl}
        imgAlt={menuContent.imgAlt}
      />
    );
    expect(container).toMatchSnapshot();
  });
});

describe('引数に指定のデータを与えた時', () => {
  beforeEach(() => {
    render(
      <Menu
        url={menuContent.url}
        title={menuContent.title}
        description={menuContent.description}
        imgUrl={menuContent.imgUrl}
        imgAlt={menuContent.imgAlt}
      />
    );
  });
  test('リンクが指定したデータのurlになっていること', () => {
    const menuLink = screen.getByRole('link');
    expect(menuLink).toHaveAttribute('href', `${menuContent.url}`);
  });

  test('見出しが指定したデータのtitleになっていること', () => {
    const menuTitle = screen.getByText(`${menuContent.title}`);
    expect(menuTitle).toBeInTheDocument();
  });

  test('詳細説明が指定したデータのdescriprionになっていること', () => {
    const menuDescription = screen.getByText(`${menuContent.description}`);
    expect(menuDescription).toBeInTheDocument();
  });

  test('画像のurlが指定したデータのimgUrlになっていること', () => {
    const menuImg = screen.getByRole('img');
    // next.jsが自動でencodeを行うため、menuContent.imgUrlをencodeする
    const encodedImgUrl = encodeURIComponent(`${menuContent.imgUrl}`);
    // 完全一致ができなかったため部分一致
    expect(menuImg.getAttribute('src')).toContain(encodedImgUrl);
  });

  test('画像のaltが指定したデータのimgAltになっていること', () => {
    const menuImg = screen.getByRole('img');
    expect(menuImg).toHaveAttribute('alt', `${menuContent.imgAlt}`);
  });
});
