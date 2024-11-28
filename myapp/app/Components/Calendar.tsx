"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Updated import
import "./calendar.css";
import Image from "next/image";
import logo from "../../public/assets/logo.png";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const router = useRouter(); // From `next/navigation`

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const formattedDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setSelectedDate(formattedDate);

    // Wait briefly to show the selected date before navigating
    setTimeout(() => {
      router.push("/slotform"); // Use the correct path to your slot form
    }, 500);
  };

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate(); // Returns last day of the month
  };

  const renderCalendar = () => {
    const days = Array.from(
      { length: daysInMonth(currentMonth, currentYear) },
      (_, i) => i + 1
    );

    return days.map((day) => (
      <button
        key={day}
        className="calendar-day"
        onClick={() => handleDateClick(day)}
      >
        {day}
      </button>
    ));
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // December
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // January
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="calendar-page">
      <div className="calendar-header-logo">
        <div className="logo">
          <Image src={logo} alt="Logo" width={100} height={100} />
        </div>
        <h3>When are you joining us?</h3>
      </div>
      <div className="calendar-container">
        <div className="calendar-header">
          <div className="month-navigation">
            <button onClick={handlePreviousMonth}>&lt;</button>
            <span>
              {months[currentMonth]} {currentYear}
            </span>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
        </div>
        <div className="calendar-grid">{renderCalendar()}</div>
        <div className="calendar-footer">
          <button onClick={() => alert("Canceled")}>Cancel</button>
          <button>OK</button>
        </div>
      </div>
    </div>
  );

}
export default Calendar;
