import HistoriesList from '@/components/pages/admin/histories/list';
import HistoriesSelect from '@/components/pages/admin/histories/select'
const HistoriesPage = () => {
  return (
    <>
      <HistoriesSelect className=''/>
      <HistoriesList />
    </>);
};

export default HistoriesPage;
