"use client";
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import './admindashboard.css'


const AdminView: NextPage = () => {
    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            <p>View and manage the data submitted by users</p>
            <Image src="/assets/logo.png" alt="Logo" width={100} height={100} />
        </div>
    )
}



export default AdminView;