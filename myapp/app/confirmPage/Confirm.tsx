'use client';

import './confirm.css';
import Image from 'next/image';
import logo from '../../public/assets/logo.png';
import { useRouter } from "next/navigation";

const Confirm = () => {
    const router = useRouter();
    const formData = JSON.parse(sessionStorage.getItem('formData') || '[]'); 
    const slotAndDate = JSON.parse(sessionStorage.getItem('slotAndDate') || '{}');

    const firstName = formData[0]?.name || 'N/A';
  console.log(formData)
    const { slots, selectedDate } = slotAndDate; 

    const calculatePrice = (slots: number) => {
        return slots * 1500; 
    };

    const price = calculatePrice(slots || 0);

    const groupedData = formData.map((data, index) => ({
        ...data,
        slot: `slot${index + 1}`,  
           
      }));
    
const handleClick = async () => {

   const payload = {
    formData: groupedData,
    slotAndDate, 
};
  const checkData = formData[0]
    const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( payload)
      });
        const data = await response.json();
       // console.log(data)

       router.push('/checkout')
}





    return (
        <div className="confirm-container">
            <div className="logo-container">
                <Image src={logo} alt="Logo" width={150} height={150} />
            </div>
            <h2 className="checkout-title">CHECKOUT</h2>
            <div className="summary-card">
                <h3>Booking Summary</h3>
                <p>
                    <strong>Name:</strong> {firstName}
                </p>
                <p>
                    <strong>Slots:</strong> {slots || 0}
                </p>
                <p>
                    <strong>Date:</strong> {selectedDate || 'N/A'}
                </p>
                <p>
                    <strong>Amount:</strong>{' '}
                    <span className="price">{price} INR</span>
                </p>
                <button className="confirm-btn" onClick={handleClick}>Confirm</button>
            </div>
        </div>
    );
};

export default Confirm;
