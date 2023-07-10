import Menu from '@/components/ui/Menu';
import Notification from '@/components/pages/general/top/Notification';

const Home = async () => {
  return (
    <main>
      <div className="flex flex-col items-center">
        <Notification title="進捗状況" className="" />
      </div>

      <div className="flex flex-wrap justify-center mt-20">
        <Menu
          url="/questions"
          title="回答する"
          description="質問に答えて顔合わせの準備をします。"
          imgUrl="/icon/document_icon.png"
          imgAlt="回答一覧画面アイコン"
          className=""
        />
        <Menu
          url="/histories"
          title="回答履歴"
          description="自身の回答をここから確認してください。"
          imgUrl="/icon/history_icon.png"
          imgAlt="回答履歴画面アイコン"
        />
      </div>
    </main>
  );
};

export default Home;
