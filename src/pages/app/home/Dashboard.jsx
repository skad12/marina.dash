import { Bar, Line } from "react-chartjs-2";
import "../../../css/pages/app/dashboard.css";
import { data, labels, options } from "../../../components/charts";
import Stat from "../../../components/Stat";
import recent from "../../../components/svg/recent.svg";
import booked from "../../../components/svg/booked.svg";
import checkedIn from "../../../components/svg/checked-in.svg";
import available from "../../../components/svg/available.svg";
import Bookings from "../../../components/table/active/Bookings";
import Table from "../../../components/table/Table";
import { colorPrimary, getFirstAndLastDateOfMonth } from "../../../utils";
import Revenue from "../../../components/charts/Revenue";
import DataContext from "../../../contexts/DataContext";
import { useContext, useState } from "react";

const Card = ({ title, svg, value }) => (
  <div className="hover flex justify-center align-center s-card">
    <div className="icon">
      <img src={svg} alt={title} />
    </div>
    <h2 className="t-primary">{value}</h2>
    <span>{title}</span>
  </div>
);

function Dashboard(props) {
  const { apartments } = useContext(DataContext);
  return (
    <div className="">
      <div className="stats flex">
        <div className="stat flex bookings-stat">
          <Card svg={recent} title="Total Bookings" value={apartments.length} />
          <Card
            svg={available}
            title="Available Rooms"
            value={apartments.filter((a) => a.available).length}
          />
          <Card
            svg={booked}
            title="Booked Rooms"
            value={apartments.filter((a) => a.currentBooking).length}
          />
          <Card svg={checkedIn} title="Checked-in Rooms" />
        </div>
        <Revenue />
        {/* <div className="stat">
          <h4 className="t-primary">Today's Staff Schedule</h4>
          <br />
          <Table showSearch={false} head={head} />
        </div> */}
      </div>
      <br />
      <br />
      <Bookings
        to={getFirstAndLastDateOfMonth().lastDay}
        from={getFirstAndLastDateOfMonth().firstDay}
        title="Recent Bookings"
        showSearch={false}
      />
      {/* <Bar options={options} data={data} /> */}
    </div>
  );
}

export default Dashboard;

const head = [
  {
    title: "Staff Name",
    target: "name",
  },
  {
    title: "Contact",
    target: "contact",
  },
  {
    title: "Role",
    target: "role",
  },
  {
    title: "Shift",
    target: "shift",
  },
];
