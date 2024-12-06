"use client";

import AdminDataView from "./AdminDataView"; 
import {Suspense} from "react";



const AdminDataPage = () => {
  return ( 
    <Suspense>

     <AdminDataView />;
     </Suspense>


)    };

export default AdminDataPage;
