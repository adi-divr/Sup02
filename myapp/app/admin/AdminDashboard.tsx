"use client";
import { useEffect, useState } from "react";
import './admindashboard.css'; 
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import nextButton from "../../public/assets/next.png";

interface BookingData {
  name: string;
  email: string;
  phone: string;
  weigh: string;
  age: string;
}

const AdminView = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/GetData");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        const rows = result.data;

        const formattedData = rows.slice(1).map((row: string[]) => ({
          name: row[0] || "",
          email: row[1] || "",
          phone: row[2] || "",
          weigh: row[3] || "",
          age: row[4] || "",
        }));
        
        setBookings(formattedData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-container">
      <div className="header">
        <Image src={logo} alt="Logo" width={100} height={100} />
        <h2>Manage Bookings</h2>
      </div>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking, index) => (
            <div className="booking-card" key={index}>
              <div className="card-container">
                <div className="details">
                    <p> <strong>{booking.name}</strong></p>
                  <p> {booking.phone}</p>
                  <p> {booking.email}</p>
                  {/* <p>Weigh below 100kg: {booking.weigh}</p>
                  <p>Age above 18: {booking.age}</p> */}
                </div>
                {/* <button className="submit-button">{nextButton}</button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminView;
