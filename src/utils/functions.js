export function getAllDaysBetweenDates(startDate, endDate) {
  // Create date objects from the input strings
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Validate input
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error("Invalid date format");
    return [];
  }

  // Initialize an array to store the days
  const allDays = [];

  // Loop through each day and push it to the array
  let currentDay = new Date(start);
  while (currentDay <= end) {
    allDays.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  return allDays.map((d) => {
    d.setHours(12, 0, 0, 0);
    return d;
  });
}
