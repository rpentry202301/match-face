import Menu from '@/components/ui/Menu';
import Notification from '@/components/pages/general/top/Notification';
import { cookies } from 'next/headers';

type MenuContent = {
  id: number;
  url: string;
  title: string;
  description: string;
  imgUrl: string;
  imgAlt: string;
};

const Top = async () => {
  const cookie = cookies();
  const userId = cookie.get('userId')?.value;
  // 以下進捗状況データ取得
  // 回答済データ
  const answeredRes = await fetch(
    `${process.env.BE_URL}/user/${userId}/answer_requests/is_answered/true`,
    { cache: 'no-store' }
  );
  const answeredData = await answeredRes.json();
  const answeredAnswerRequests = answeredData.progressAnswerRequestList;

  // 未回答データ
  const notAnsweredRes = await fetch(
    `${process.env.BE_URL}/user/${userId}/answer_requests/is_answered/false`,
    { cache: 'no-store' }
  );
  const notAnsweredData = await notAnsweredRes.json();
  const notAnsweredAnswerRequests = notAnsweredData.progressAnswerRequestList;

  // メニューボタン用データ取得
  const response = await fetch(`${process.env.BE_URL}/user_main_elements`, {
    cache: 'no-store',
  });
  const topData = await response.json();
  const menuContentsArray = topData.userMainElementList;

  return (
    <main>
      <div className="flex flex-col items-center mt-8 mb-20">
        <Notification
          className=""
          answeredAnswerRequests={answeredAnswerRequests}
          notAnsweredAnswerRequests={notAnsweredAnswerRequests}
        />
        {/* )} */}
      </div>

      <div className="grid grid-cols-2 gap-20 w-3/5 place-items-center mx-auto">
        {menuContentsArray.map((menuContent: MenuContent) => (
          <div key={menuContent.id} className="">
            <Menu
              url={menuContent.url}
              title={menuContent.title}
              description={menuContent.description}
              imgUrl={menuContent.imgUrl}
              imgAlt={menuContent.imgAlt}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Top;
