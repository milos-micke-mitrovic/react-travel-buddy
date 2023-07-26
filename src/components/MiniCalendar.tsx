import React, { useState, useEffect } from "react";
import InputDropdown from "./UI/InputDropdown";

interface MiniCalendarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const currentDate =
    selectedDate && !isNaN(Date.parse(selectedDate))
      ? new Date(selectedDate)
      : new Date();

  const [month, setMonth] = useState<number>(currentDate.getMonth());
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);
  const [showMonthDropdown, setShowMonthDropdown] = useState<boolean>(false);
  const [showYearDropdown, setShowYearDropdown] = useState<boolean>(false);

  useEffect(() => {
    generateDaysInMonth(year, month);
  }, [year, month]);

  const generateDaysInMonth = (year: number, month: number) => {
    const days = new Array(31).fill(0).map((_, index) => index + 1);
    const lastDay = new Date(year, month + 1, 0).getDate();
    setDaysInMonth(days.slice(0, lastDay));
  };

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prevYear) => prevYear - 1);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const formattedDate = `${year}-${(month + 1)
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    onDateChange(formattedDate);
  };

  const handleMonthClick = () => {
    setShowMonthDropdown(true);
    setShowYearDropdown(false);
  };

  const handleYearClick = () => {
    setShowYearDropdown(true);
    setShowMonthDropdown(false);
  };

  const handleMonthSelection = (selectedMonth: string) => {
    const newMonth = new Date(`${year}-${selectedMonth}-01`).getMonth();
    setMonth(newMonth);
    setShowMonthDropdown(false);
  };

  const handleYearSelection = (selectedYear: string) => {
    const newYear = parseInt(selectedYear, 10);
    setYear(newYear);
    setShowYearDropdown(false);
  };

  return (
    <InputDropdown>
      <div className="border border-main-light rounded-lg p-2">
        <div className="flex items-center justify-between mb-2 ">
          <button type="button" onClick={handlePreviousMonth}>
            &#8249;
          </button>

          <div>
            <button type="button" onClick={handleMonthClick}>
              {new Date(year, month).toLocaleDateString("en-US", {
                month: "long",
              })}
            </button>

            {showMonthDropdown && (
              <InputDropdown
                liItems={[
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
                ]}
                onClick={handleMonthSelection}
              />
            )}

            <button type="button" onClick={handleYearClick}>
              {String(year)}
            </button>

            {showYearDropdown && (
              <InputDropdown
                liItems={Array.from({ length: 11 }, (_, i) => String(year + i))}
                onClick={handleYearSelection}
              />
            )}
          </div>

          <button type="button" onClick={handleNextMonth}>
            &#8250;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
            <div key={day} className="text-center text-sm font-semibold">
              {day}
            </div>
          ))}

          {daysInMonth.map((day) => (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              className={`text-center p-1 cursor-pointer ${
                selectedDate &&
                selectedDate.endsWith(`-${day.toString().padStart(2, "0")}`)
                  ? "bg-blue-500 text-white rounded-full"
                  : ""
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </InputDropdown>
  );
};

export default MiniCalendar;
