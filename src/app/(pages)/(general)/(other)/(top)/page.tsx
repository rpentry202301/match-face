import Menu from '@/components/ui/Menu';
import Notification from '@/components/pages/general/top/Notification';

const Home = async () => {
  return (
    <main>
      <div className="flex flex-col items-center mt-8 mb-20">
        <Notification
          title="進捗状況"
          completedTasksNumbers={12}
          incompletedTasksNumbers={10}
          deadlineDay="12月14日"
          deadlineNumbers={10}
          className=""
        />
      </div>

      <div className="flex flex-wrap justify-center">
        <Menu
          url="/questions"
          title="回答する"
          description="質問に答えて顔合わせの準備をします。"
          imgUrl="/icon/document_icon.png"
          imgAlt="回答一覧画面アイコン"
          className=" mr-20"
        />
        <Menu
          url="/histories"
          title="回答履歴"
          description="自身の回答をここから確認してください。"
          imgUrl="/icon/history_icon.png"
          imgAlt="回答履歴画面アイコン"
          className=" ml-20"
        />
      </div>
    </main>
  );
};

export default Home;
