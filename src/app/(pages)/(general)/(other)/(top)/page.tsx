import Menu from '@/components/ui/Menu';

const Home = async () => {
  return (
    <main>
      <div>トップページ</div>

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
    </main>
  );
};

export default Home;
