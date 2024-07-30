import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export const options = {
  // responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "",
    },
  },
};

export const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 20, 30, 40, 50, 60, 70],
      backgroundColor: "#0c3e83",
    },
  ],
};
