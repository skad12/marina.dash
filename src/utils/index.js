import client from "../api";
import urls from "../api/urls";

export const getNestedValueFromObject = (obj, target) => {
  if (!target || !target.split) return null;
  target = target.split(".");
  let data = obj[target[0]];
  for (let i = 1; i < target.length; i++) {
    try {
      data = data[target[i]];
    } catch (error) {
      return null;
    }
  }
  return data;
};

export function objectToFormData(
  obj,
  formData = new FormData(),
  parentKey = null
) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        objectToFormData(value, formData, fullKey);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          objectToFormData(item, formData, `${fullKey}[${index}]`);
        });
      } else {
        formData.append(fullKey, value);
      }
    }
  }

  return formData;
}

export const excludeFromObject = (fields = [], obj) => {
  const output = {};
  Object.keys(obj).forEach((f) => {
    if (!fields.includes(f)) {
      output[f] = obj[f];
    }
  });
  return output;
};

export const selectFromObject = (fields = [], obj) => {
  const output = {};
  fields.forEach((f) => {
    output[f] = obj[f];
  });
  return output;
};

export const numberFormatter = (n, pre = "₦") =>
  pre + n?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const getPayUrl = (url) => {
  while (url.includes("|")) {
    url = url.replace("|", "%7C");
  }
  return url;
};

export const getImageUrl = (url) =>
  url
    ? url?.includes("http") || url?.includes("file://")
      ? url
      : client.getUri() + urls.files.baseUrl + url
    : null;

export function formatDate(date) {
  date = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // If the date is in the future, return tomorrow or the day and month with year.
  if (date > now) {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      const day = days[date.getDay()];
      const dayOfMonth = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${day} ${dayOfMonth}${getDaySuffix(dayOfMonth)} ${month} ${year}`;
    }
  }

  // If the date is within the last minute, return 'just now'.
  if (diffInSeconds <= 10) {
    return "Just now";
  }
  if (diffInSeconds <= 60) {
    const secondsAgo = Math.floor(diffInSeconds);
    return `${secondsAgo}s ago`;
  }

  // If the date is within the last hour, return the time difference in seconds.
  if (diffInSeconds <= 3600) {
    const secondsAgo = Math.floor(diffInSeconds / 60);
    return `${secondsAgo}m ago`;
  }
  if (diffInSeconds <= 3600 * 24) {
    const secondsAgo = Math.floor(diffInSeconds / 3600);
    return `${secondsAgo}h ago`;
  }

  // If the date is within the last 24 hours (but not today), return 'Yesterday at HH:mm'.
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `Yesterday at ${hours}:${minutes}`;
  }

  // For dates older than yesterday, format like 'Monday 24th July 2023'.
  const day = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${dayOfMonth}${getDaySuffix(dayOfMonth)} ${month} ${year
    .toString()
    .replace("20", "")}`;
}

// Helper function to add a suffix to the day of the month (e.g., 1st, 2nd, 3rd, 4th).
function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  const lastDigit = day % 10;
  if (lastDigit === 1) {
    return "st";
  } else if (lastDigit === 2) {
    return "nd";
  } else if (lastDigit === 3) {
    return "rd";
  } else {
    return "th";
  }
}

// Helper function to add a leading zero to single-digit numbers.
function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

export const transactionStatuses = { success: "success", pending: "pending" };
export const colorPrimary = "#0c3e83";

export function getDatesBetween(startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);

  let dateList = [];
  for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    dateList.push(new Date(dt).toISOString().split("T")[0]);
  }
  return dateList;
}

export function getFirstAndLastDateOfMonth() {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Format the dates as YYYY-MM-DD
  const formattedFirstDay = formatDate_(firstDayOfMonth);
  const formattedLastDay = formatDate_(lastDayOfMonth);

  return { firstDay: formattedFirstDay, lastDay: formattedLastDay };
}

function formatDate_(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
