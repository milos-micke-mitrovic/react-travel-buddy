import React, { useState } from "react";
import { format, isSameMonth, isSameDay, startOfMonth } from "date-fns";

import InputDropdown from "./UI/InputDropdown";
import { MONTH_ABBREVIATIONS, WEEK_DAYS_ABBREVIATIONS } from "../constants";
import { generateMiniCalendarDates, yearList } from "../utils";

interface MiniCalendarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  onBlur: () => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({
  selectedDate,
  onDateChange,
  onBlur,
}) => {
  const currentDate =
    selectedDate && !isNaN(Date.parse(selectedDate))
      ? new Date(selectedDate)
      : new Date();

  const [month, setMonth] = useState<number>(currentDate.getMonth());
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [showMonthDropdown, setShowMonthDropdown] = useState<boolean>(false);
  const [showYearDropdown, setShowYearDropdown] = useState<boolean>(false);

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

  const handleDateClick = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
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

  const renderDays = () => {
    const calendarDates = generateMiniCalendarDates(year, month);
    const currentMonthStart = startOfMonth(new Date(year, month));

    return calendarDates.map((date) => {
      const classNames = [
        "text-center p-2 w-8 h-8 cursor-pointer flex items-center justify-center",
      ];

      if (!isSameMonth(date, currentMonthStart)) {
        classNames.push("text-gray-400"); // Silver tint for days from adjacent months
      } else {
        classNames.push("text-black");
      }

      if (isSameDay(date, new Date())) {
        classNames.push("bg-main-dark text-white rounded-full");
      }

      return (
        <div
          key={date.toString()}
          className={classNames.join(" ")}
          onClick={() => handleDateClick(date)}
        >
          {format(date, "d")}
        </div>
      );
    });
  };
  return (
    <InputDropdown onBlur={onBlur}>
      <div className="border border-main-light rounded-lg p-2 flex flex-col items-center">
        <div className="flex items-center justify-between mb-2 w-11/12">
          <button
            className="bg-gray-700 text-white w-4 h-4 flex justify-center items-center rounded-full pb-[2px]"
            type="button"
            onClick={handlePreviousMonth}
          >
            &larr;
          </button>

          <div className="flex gap-1">
            <div>
              <button
                className="bg-main-light px-2 rounded-md"
                type="button"
                onClick={handleMonthClick}
              >
                <div className="px-1">
                  {MONTH_ABBREVIATIONS[new Date(year, month).getMonth()]}
                  <div className="triangle-down-right w-2 h-2 inline-block ml-1"></div>
                </div>
              </button>

              {showMonthDropdown && (
                <InputDropdown
                  liItems={MONTH_ABBREVIATIONS}
                  onClick={handleMonthSelection}
                />
              )}
            </div>

            <div>
              <button
                className="bg-main-light px-2 rounded-md"
                type="button"
                onClick={handleYearClick}
              >
                <div className="px-1">
                  {year}
                  <div className="triangle-down-right w-2 h-2 inline-block ml-1"></div>
                </div>
              </button>

              {showYearDropdown && (
                <InputDropdown
                  liItems={yearList(year)}
                  onClick={handleYearSelection}
                />
              )}
            </div>
          </div>

          <button
            className="bg-gray-700 text-white w-4 h-4 flex justify-center items-center rounded-full pb-[2px]"
            type="button"
            onClick={handleNextMonth}
          >
            &rarr;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {WEEK_DAYS_ABBREVIATIONS.map((day) => (
            <div key={day} className="text-center text-sm font-semibold">
              {day}
            </div>
          ))}

          {renderDays()}
        </div>
      </div>
    </InputDropdown>
  );
};

export default MiniCalendar;
