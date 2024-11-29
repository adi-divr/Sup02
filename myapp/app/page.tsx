'use client'

import { useSearchParams } from 'next/navigation';
import Calendar from './Components/Calendar';
import AdminViewPage from './admin/page';
// import Home from './Components/Home';


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
