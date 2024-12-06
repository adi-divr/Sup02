"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import logo from "../../public/assets/logo.png";
import "./confirmadmin.css";

interface BookingData {
  name: string;
  weight: string;
  age: string;
  slot: string;
  ddmm: string;
}

const ConfirmAdmin = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const slotParam = searchParams.get("slot");
  //const dateParam = searchParams.get("dateParam");

  useEffect(() => {
    const fetchData = async () => {
        if (!slotParam) {
          console.error("No slot parameter provided");
          setError("Slot parameter is missing.");
          return;
        }
      
        
        

        try {
          const response = await fetch(`/api/GetAll?slotKey=${encodeURIComponent(slotParam)}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
          }
          const result = await response.json();
          console.log(result)
          setBookings(
            result.data.slice(1).map((row: string[]) => ({
              name: row[0] || "",
              weight: row[3] || "",
              age: row[4] || "",
              slot: row[5] || "",
            //  ddmm: row[6] || "",
              number: row[2] || "",
              date:row[7] || ""
            }))
          );
        } catch (err: unknown) {
          console.error(err);
          setError(err.message);
        }
      };

    fetchData();
  }, [slotParam]);
 
 
 
  const handleAccept = async () => {
    if (!slotParam || bookings.length === 0) {
      alert("Slot parameter or bookings are missing.");
      return;
    }
  
    const bookingData = bookings.map((booking) => ({
      name: booking.name,
      number: booking.number,
      bookingDate: booking.date,
     // totalNumberOfSlots: bookings.length,
     slotID:slotParam,
      paymentMade: (bookings.length * 1500).toString(),

    }));
  
    try {
      const response = await fetch("/api/Accepted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message); // Show warning about exceeding the limit
        return;
      }
  
      alert("Booking accepted and saved!");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit booking data. Please try again.");
    }
  };

  
  const handleReject = () => {
    console.log("Reject clicked for slot:", slotParam);
  };

  return (
    <div className="confirmation-container">
      <header className="confirmation-header">
        <Image src={logo} alt="SUP IN KOCHI Logo" className="logo" />
        {/* <div className="notification">
          <span className="notification-badge">4</span>
        </div> */}
      </header>
      <main className="confirmation-main">
        <h1 className="confirmation-title">Confirmation Portal</h1>
        <div className="slot-info">
          <span className="total-slots">
            Total Slots: <strong>{bookings.length}</strong>
          </span>
          <span className="date">{bookings[0]?.date || "N/A"}</span>
        </div>
        <div className="slot-list">
          {error ? (
            <p className="error">{error}</p>
          ) : (
            bookings.map((slot, index) => (
              <div key={index} className="slot-card">
                <p>
                  <strong>Name:</strong> {slot.name}
                </p>
                <p>
                  <strong>Weight:</strong>{" "}
                  <span
                    className={`weight ${
                      slot.weight === "above 100" ? "red-text" : "blue-text"
                    }`}
                  >
                    {slot.weight}
                  </span>
                </p>
                <p>
                  <strong>Age:</strong> <span className="blue-text">{slot.age}</span>
                </p>
              </div>
            ))
          )}
        </div>
        <div className="action-buttons">
          <button className="accept-button" onClick={handleAccept}>
            Accept
          </button>
          <button className="reject-button" onClick={handleReject}>
            Reject
          </button>
        </div>
      </main>
    </div>
  );
};

export default ConfirmAdmin;
