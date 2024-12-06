"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation"; 
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import "./slotbooking.css";
import { useRouter } from "next/navigation";




const Slotbooking = () => {
  const searchParams = useSearchParams();
  const selectedDate = searchParams.get("selectedDate"); 
  const [slots, setSlots] = useState(0);
  const router = useRouter();


  const handleIncrement = () => setSlots(slots + 1);
  const handleDecrement = () => setSlots(slots > 0 ? slots - 1 : 0);



  const handleSubmit = () => {
    console.log(`Date: ${selectedDate}, Slots: ${slots}`);
    // Add your submit logic here
    router.push(`/slotform?selectedDate=${selectedDate}&slots=${slots}`);
  };

  return (
    <div className="container">
      <div className="header">
        <Image src={logo} alt="Logo" width={150} height={150} />
        <h2>SLOTS</h2>
      </div>
      <div className="card">
        <div className="row">
          <span>Date selected</span>
          <span>{selectedDate || "No date selected"}</span>
        </div>
        <div className="row">
          <span>No. of slots</span>
          <div className="counter">
            <button onClick={handleDecrement}>&#9660;</button>
            <span>{slots}</span>
            <button onClick={handleIncrement}>&#9650;</button>
          </div>
        </div>
        <button className="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Slotbooking;
