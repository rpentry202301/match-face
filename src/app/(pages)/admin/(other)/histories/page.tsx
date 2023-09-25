// 'use client'
import HistoriesList from '@/components/pages/admin/histories/list';
import HistoriesSelect from '@/components/pages/admin/histories/select'

const HistoriesPage = async() => {
  return (
    <>
        <HistoriesSelect className={''}/>
        <HistoriesList />
    </>);
};

export default HistoriesPage;
