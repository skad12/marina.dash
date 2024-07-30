import React, { useEffect, useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-big-calendar/lib/sass/styles.scss";
// import moment from "moment";

import { formatDate, getFirstAndLastDateOfMonth } from "../../../utils";
import Filter from "../../../components/Filter";
import useBookings from "../../../hooks/api/useBookings";
import { getAllDaysBetweenDates } from "../../../utils/functions";
import useApartments from "../../../hooks/api/useApartments";

export default function Dashboard() {
  const [{ from, to }, setFilterValues] = useState({
    from: getFirstAndLastDateOfMonth().firstDay,
    to: getFirstAndLastDateOfMonth().lastDay,
  });
  const { getBookings, bookings } = useBookings();
  const { getApartments, apartments } = useApartments();

  useEffect(() => {
    getBookings(from, to);
  }, []);

  useEffect(() => {
    getApartments();
  }, [bookings]);

  function getColor(apartmentId, date) {
    const bookingsForApartment = bookings.filter(
      (booking) => booking.apartment._id === apartmentId
    );

    for (const booking of bookingsForApartment) {
      const checkInDate = new Date(booking.from);
      const checkOutDate = new Date(booking.to);

      checkInDate.setHours(12, 0, 0, 0);
      checkOutDate.setHours(12, 0, 0, 0);

      if (date >= checkInDate && date < checkOutDate) {
        return "#2196f3";
      }
    }

    return "#f44336";
  }

  return (
    <div>
      <Filter setValues={setFilterValues} handleChange={getBookings} />
      <div className="boxes flex">
        {getAllDaysBetweenDates(from, to).map((d, idx) => (
          <div className="box" key={idx}>
            <h4 style={{ padding: 10 }}>{formatDate(d)}</h4>
            {apartments.map((apt) => (
              <div
                style={{
                  background: getColor(apt._id, d),
                  color: "white",
                }}
                className="apt"
              >
                {apt.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
