// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import "./adminviewdata.css";

// type SlotDetails = {
//   name: string;
//   phone: string;
// };

// type ApiResponse = {
//   totalSlots: number;
//   details: SlotDetails[] | undefined; // Mark as potentially undefined
// };

// const AdminDataView = () => {
//   const [totalSlots, setTotalSlots] = useState<number>(0);
//   const [details, setDetails] = useState<SlotDetails[]>([]);
//   const searchParams = useSearchParams();
//   const selectedDate = searchParams.get("date") || ""; // Get the selected date from query parameters

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!selectedDate) return;

//       try {
//         const response = await fetch(`/api/GetCalendarData?date=${selectedDate}`);
//         const data: ApiResponse = await response.json();
//         if (response.ok) {
//             console.log(data)

//           setTotalSlots(data.totalSlots || 0); // Ensure totalSlots is always a number
//           setDetails(data.name || []); // Ensure details is always an array
//         } else {
//           console.error("Error fetching details:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching API data:", error);
//       }
//     };

//     fetchData();
//   }, [selectedDate]);

//   return (
//     <div className="confirmation-portal">
//       <h1 className="portal-header">Confirmation Portal</h1>
//       <div className="portal-summary">
//         <span className="total-slots">Total Slots: <strong>{totalSlots}</strong></span>
//         <span className="selected-date">{selectedDate ? new Date(selectedDate).toDateString() : "No date selected"}</span>
//       </div>
//       <div className="portal-details">
//         {details && details.length > 0 ? ( // Add a defensive check for details
//           details.map((detail, index) => (
//             <div key={index} className="detail-card">
//               <p className="detail-name"><strong>Name:</strong> {detail.name}</p>
//               <p className="detail-phone"><strong>Phone:</strong> {detail.phone}</p>
//             </div>
//           ))
//         ) : (
//           <p className="no-details">No details available for the selected date.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDataView;
'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./adminviewdata.css";

type SlotDetails = {
  name: string;
  phone: string;
};

type ApiResponse = {
  totalSlots: number;
  details: SlotDetails[] | undefined; 
};

const AdminDataView = () => {
  const [totalSlots, setTotalSlots] = useState<number>(0);
  const [details, setDetails] = useState<SlotDetails[]>([]);
  const searchParams = useSearchParams();
  const selectedDate = searchParams.get("date") || ""; 

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDate) return;

      try {
        const response = await fetch(`/api/GetCalendarData?date=${selectedDate}`);
        const data: ApiResponse = await response.json();

        if (response.ok) {
          setTotalSlots(data.totalSlots || 0); 
          setDetails(Array.isArray(data.details) ? data.details : []); 
        } else {
          console.error("API Error:", data.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  return (
    <div className="confirmation-portal">
      <h1 className="portal-header">Slot Names</h1>
      <div className="portal-summary">
        <span className="total-slots">Total Slots: <strong>{totalSlots}</strong></span>
        <span className="selected-date">
          {selectedDate ? new Date(selectedDate).toDateString() : "No date selected"}
        </span>
      </div>
      <div className="portal-details">
        {details && details.length > 0 ? (
          details.map((detail, index) => (
            <div key={index} className="detail-card">
              <p className="detail-name"><strong>Name:</strong> {detail.name}</p>
              <p className="detail-phone"><strong>Phone:</strong> {detail.number}</p>
            </div>
          ))
        ) : (
          <p className="no-details">No details available for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDataView;
