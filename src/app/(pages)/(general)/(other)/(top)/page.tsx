import Menu from '@/components/ui/Menu';
import Notification from '@/components/pages/general/top/Notification';
import { menuContentsArray } from '@/const/top';
import { trueAnswerRequests, falseAnswerRequests } from '@/const/notification';

type MenuContent = {
  id: number;
  url: string;
  title: string;
  description: string;
  imgUrl: string;
  imgAlt: string;
};

// todo: データは日付の昇順で並べる
// ダミーデータ
const completedData = trueAnswerRequests;
const incompletedData = falseAnswerRequests;

const Home = async () => {
  return (
    <main>
      <div></div>

      <div className="flex flex-col items-center mt-8 mb-20">
        <Notification
          className=""
          completedData={completedData}
          incompletedData={incompletedData}
        />
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

export default Home;
