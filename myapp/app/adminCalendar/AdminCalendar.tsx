"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/assets/logo.png";
import "./admincalendar.css";
import { useRouter } from "next/navigation";


const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [slotsData, setSlotsData] = useState<Record<string, number>>({}); // Store slots for each date
  const router = useRouter();

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate(); // Returns the last day of the month
  };

  // Fetch slots data from the server
  useEffect(() => {
    const fetchSlotsData = async () => {
      try {
        const response = await fetch(`/api/getCalendarValue?month=${currentMonth + 1}&year=${currentYear}`);
        const data = await response.json();
        if (response.ok) {
          setSlotsData(data.slots); // Expected format: { "2024-12-05": 18, "2024-12-06": 10 }
        } else {
          console.error("Failed to fetch slots:", data.message);
        }
      } catch (error) {
        console.error("Error fetching slots data:", error);
      }
    };

    fetchSlotsData();
  }, [currentMonth, currentYear]);

  const handleDateClick = (day: number) => {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  
    router.push(`/adminCalendarView?date=${formattedDate}`);
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

  const renderCalendar = () => {
    const days = Array.from(
      { length: daysInMonth(currentMonth, currentYear) },
      (_, i) => i + 1
    );

    return days.map((day) => {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`; 
      const slots = slotsData[date] || 0; 

      return (
        <button
          key={day}
          className="calendar-day-new"
          onClick={() => handleDateClick(day)}
          style={{ background: "white" }} 
        >
          {day}
          <div className="slot-count-new">{slots > 0 ? slots : ""}</div>
        </button>
      );
    });
  };

  return (
    <div className="calendar-page-new">
      <div className="calendar-header-logo-new">
        <div className="logo-new">
          <Image src={logo} alt="Logo" width={150} height={150} />
        </div>
        <h3>When are you joining us?</h3>
      </div>
      <div className="calendar-container-new">
        <div className="calendar-header-new">
          <div className="month-navigation-new">
            <button onClick={handlePreviousMonth}>&lt;</button>
            <span>
              {months[currentMonth]} {currentYear}
            </span>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>
        </div>
        <div className="calendar-grid-new">{renderCalendar()}</div>
      </div>
    </div>
  );
};

export default Calendar;
