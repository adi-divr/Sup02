"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Updated import
import "./calendar.css";
import Image from "next/image";
import logo from "../../public/assets/logo.png";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const router = useRouter(); // From `next/navigation`

  const handleDateClick = (date: string) => {
    setSelectedDate(date);

    // Wait briefly to show the selected date before navigating
    setTimeout(() => {
      router.push("/slotform"); // Use the correct path to your slot form
    }, 500);
  };

  const renderCalendar = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1); // Days in the month (adjust for different months)
    return days.map((day) => (
      <button
        key={day}
        className="calendar-day"
        onClick={() => handleDateClick(`2024-08-${day}`)}
      >
        {day}
      </button>
    ));
  };

  return (
    <div className="calendar-container">
      <div className="logo">
        <Image src={logo} alt="Logo" width={100} height={100} />
      </div>
      <h3>When are you joining us?</h3>
      <div className="calendar-header">
        <span>Select date</span>
        <div className="selected-date">
          {selectedDate ? selectedDate : "Mon, Aug 17"}
        </div>
      </div>
      <div className="calendar-grid">{renderCalendar()}</div>
      <div className="calendar-footer">
        <button onClick={() => alert("Canceled")}>Cancel</button>
        <button>OK</button>
      </div>
    </div>
  );
};

export default Calendar;
