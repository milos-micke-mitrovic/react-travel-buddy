import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
} from "date-fns";

export const todayDate = () =>
  new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export const yearList = (yearToRemove: number) => {
  const currentYear = parseInt(todayDate().split("/")[2], 10);
  const nextTenYears = Array.from({ length: 11 }, (_, i) =>
    (currentYear + i).toString()
  );
  const filteredYears = nextTenYears.filter(
    (year) => year !== yearToRemove.toString()
  );

  return filteredYears;
};

export const generateMiniCalendarDates = (
  year: number,
  monthIndex: number
): Date[] => {
  const currentDate = startOfMonth(new Date(year, monthIndex));
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 }); // End on Sunday

  const days = [];

  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return days;
};
