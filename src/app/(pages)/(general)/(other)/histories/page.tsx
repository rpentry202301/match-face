import HistoriesSelect from "@/components/pages/admin/histories/select";
import HistoryList from "@/components/pages/general/histories/History_List";

const HistoriesPage = () => {
  return (
    <div className="flex flex-col items-center h-screen ">
      <HistoriesSelect className="ml-[0vw]" />
      <HistoryList />
    </div>
  );
};

export default HistoriesPage;
