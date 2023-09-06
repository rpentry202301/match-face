'use client'
import Loading from '@/components/elements/loading/Loading';
import HistoriesList from '@/components/pages/admin/histories/list';
import HistoriesSelect from '@/components/pages/admin/histories/select'
import { Suspense } from 'react';

const HistoriesPage = () => {
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <HistoriesSelect className={''}/>
        <HistoriesList />
      </Suspense>
    </>);
};

export default HistoriesPage;
