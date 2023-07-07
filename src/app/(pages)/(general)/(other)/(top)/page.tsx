import Menu from '@/components/ui/Menu';
import Notification from '@/components/pages/general/top/Notification';

const Home = async () => {
  return (
    <main>
      <div className="flex flex-col items-center">
        <Notification title="進捗状況" description="対応済" className="" />
      </div>

      <div className="flex items-center">
        <Menu
          url="/questions"
          title="回答する"
          description="質問に答えて顔合わせの準備をします"
          imgUrl="/icon/human_icon.png"
          imgAlt="回答一覧画面アイコン"
        />
        <Menu
          url="/histories"
          title="回答履歴"
          description="自身の回答をここから確認してください"
          imgUrl="/icon/human_icon.png"
          imgAlt="回答履歴画面アイコン"
        />
      </div>
    </main>
  );
};

export default Home;
