'use client'

import { useSearchParams } from 'next/navigation';
import Calendar from './Components/Calendar';
import AdminViewPage from './admin/page';
// import Home from './Components/Home';
// import HomePage from './home/page'


const Page = () => {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('isadmin') === 'true';

  return (
    <div>
      
      {isAdmin ? <AdminViewPage /> : <Calendar />}
    </div>
  );
};

export default Page;
