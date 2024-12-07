'use client'

//import { useSearchParams } from 'next/navigation';
import Calendar from './Components/Calendar';
//import AdminViewPage from './admin/page';
// import Home from './Components/Home';
// import HomePage from './home/page'


const Page = () => {
 // const searchParams = useSearchParams();
 // const isAdmin = searchParams?.get('isadmin') === 'true';  {isAdmin ? <AdminViewPage /> : }

  return (
    <div>
      <Calendar />
      
    </div>
  );
};

export default Page;


// 'use client';

// // import { useSearchParams } from 'next/navigation';
// import Calendar from './Components/Calendar';
// import AdminViewPage from './admin/page';
// import { useEffect, useState } from 'react';

// const Page = () => {
//   const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     setIsAdmin(searchParams.get('isadmin') === 'true');
//   }, []);

//   if (isAdmin === null) {
//     // Render a loading state or fallback during the initial load
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {isAdmin ? <AdminViewPage /> : <Calendar />}
//     </div>
//   );
// };

// export default Page;
