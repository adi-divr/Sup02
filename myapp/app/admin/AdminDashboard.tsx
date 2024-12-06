// "use client";
// import { useEffect, useState } from "react";
// import "./admindashboard.css";
// import Image from "next/image";
// import logo from "../../public/assets/logo.png";
// import nextButton from "../../public/assets/next.png";
// import { useRouter } from "next/navigation";

// interface BookingData {
//   name: string;
//   email: string;
//   phone: string;
//   slot: string;
//   ddmm: string;
//   bookingDate: string
// }

// const AdminView = () => {
//   const [bookings, setBookings] = useState<BookingData[]>([]);
//   const [error, setError] = useState<string>("");
//   const router = useRouter();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/GetData");
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const result = await response.json();
// console.log(result)
//         const rows = result.data;

//         const formattedData = rows.slice(1).map((row: string[]) => ({
//           name: row[0] || "",
//           email: row[1] || "",
//           phone: row[2] || "",
//           slot: row[5] || "",
//           ddmm: row[6] || "",
//           bookingDate: row[7] || "",
//         }));

//         setBookings(formattedData);
//       } catch (err: any) {
//         setError(err.message);
//       }
//     };

//     fetchData();
//   }, []);
//   //console.log(bookings)

//   const handleNextClick = (name: string, slot: string, date:string) => {
//     // Navigate to adminConfirm page with query parameters
//     router.push(`/adminConfirm?name=${encodeURIComponent(name)}&slot=${encodeURIComponent(slot)}&bookingdate=${encodeURIComponent(date)}`);
//   };
//   return (
//     <div className="admin-container">
//       <div className="header">
//         <Image src={logo} alt="Logo" className="logo" />
//         <h2>Manage Bookings</h2>
//       </div>
//       {error ? (
//         <p className="error">{error}</p>
//       ) : (
//         <div className="booking-list">
//           {bookings.map((booking, index) => (
//             <div className="booking-card" key={index}>
//               <div className="card-header">
//                 <span>Total Slots: {booking.slot}</span>
//                 <span>{booking.bookingDate}</span>
//               </div>
//               <div className="card-details">
//                 <p><strong>{booking.name}</strong></p>
//                 <p><i className="fa fa-phone"></i> {booking.phone}</p>
//                 <p><i className="fa fa-envelope"></i> {booking.email}</p>
//               </div>
//               <button
//                 className="next-button"
//                 onClick={() => handleNextClick(booking.name, booking.slot, booking.bookingDate)}
//               >
//                 <Image src={nextButton} alt="Next" />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminView;

"use client";
import { useEffect, useState } from "react";
import "./admindashboard.css";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import nextButton from "../../public/assets/next.png";
import { useRouter } from "next/navigation";

interface BookingData {
  name: string;
  email: string;
  phone: string;
  slot: string;
  ddmm: string;
  bookingDate: string;
}

const AdminView = () => {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/GetData");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result);
        const rows = result.data;

        const formattedData = rows.slice(1).map((row: string[]) => ({
          name: row[0] || "",
          email: row[1] || "",
          phone: row[2] || "",
          slot: row[5] || "",
          ddmm: row[6] || "",
          bookingDate: row[7] || "",
        }));

        setBookings(formattedData);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleNextClick = (name: string, slot: string, date: string) => {
    router.push(
      `/adminConfirm?name=${encodeURIComponent(name)}&slot=${encodeURIComponent(slot)}&bookingdate=${encodeURIComponent(
        date
      )}`
    );
  };

  const handleCustomButtonClick = () => {
    console.log("Custom button clicked!");
    router.push(`/adminCalendar`)

  };

  return (
    <div className="admin-container">
      <div className="header">
        <Image src={logo} alt="Logo" className="logo" />
        <h2>Manage Bookings</h2>
        {/* Custom button */}
        <button className="custom-button" onClick={handleCustomButtonClick}>
          Calendar
        </button>
      </div>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking, index) => (
            <div className="booking-card" key={index}>
              <div className="card-header">
                <span>Total Slots: {booking.slot}</span>
                <span>{booking.bookingDate}</span>
              </div>
              <div className="card-details">
                <p>
                  <strong>{booking.name}</strong>
                </p>
                <p>
                  <i className="fa fa-phone"></i> {booking.phone}
                </p>
                <p>
                  <i className="fa fa-envelope"></i> {booking.email}
                </p>
              </div>
              <button
                className="next-button"
                onClick={() => handleNextClick(booking.name, booking.slot, booking.bookingDate)}
              >
                <Image src={nextButton} alt="Next" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminView;
