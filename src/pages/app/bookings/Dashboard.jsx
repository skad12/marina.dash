import DisplayCard from "../../../components/DisplayCard";
import useBookings from "../../../hooks/api/useBookings";
import Filter from "../../../components/Filter";
import { svgs } from "../../../utils/svgs";
import { useEffect, useState } from "react";
import Bookings from "../../../components/table/active/Bookings";
import { getFirstAndLastDateOfMonth } from "../../../utils";

function Dashboard(props) {
  const [{ from, to }, setFilter] = useState({
    from: getFirstAndLastDateOfMonth().firstDay,
    to: getFirstAndLastDateOfMonth().lastDay,
  });
  const { bookings, getBookings, isLoading } = useBookings();

  useEffect(() => {
    getBookings(from, to);

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="flex cards">
        <DisplayCard
          svg={svgs.bed}
          value={bookings.length}
          title="Total Bookings"
        />
        <DisplayCard
          svg={svgs.bed}
          value={bookings.filter((a) => a.status === "checkedin").length}
          title="Active Bookings"
        />
        <DisplayCard
          svg={svgs.bed}
          value={bookings.filter((a) => a.status === "active").length}
          title="Confirmed Booked"
        />
      </div>
      <Filter
        setValues={() => {}}
        handleChange={(from, to) => setFilter({ from, to })}
      />
      <Bookings from={from} to={to} showSearch={true} />
    </div>
  );
}

export default Dashboard;
