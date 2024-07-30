import { useEffect } from "react";
import useBookings from "../../../hooks/api/useBookings";
import Table from "../Table";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils";
import routes, { getUrl } from "../../../utils/routes";

const Bookings = ({ showSearch, title = "Bookings", data = [], from, to }) => {
  const { bookings, getBookings, isLoading, getBookingsSearch } = useBookings();

  const arr = data.length
    ? [
        {
          title: "Name",
          target: ["firstName", "lastName"],
          render: (a) => a.join(" "),
        },

        {
          title: "Reference",
          target: "*",
          className: "fx-5",
          render: (v) => (
            <Link
              to={getUrl(routes.app.bookings.baseUrl + routes.details)}
              state={{ booking: v }}
            >
              {v.code}
            </Link>
          ),
        },
      ]
    : [
        {
          title: "Apartment",
          target: "apartment.name",
          className: "fx-5",
          render: (v) => <Link to="/">{v}</Link>,
        },
        {
          title: "Name",
          target: ["firstName", "lastName"],
          render: (a) => a.join(" "),
        },
        {
          title: "Email",
          target: "email",
          render: (v) => <Link to="/">{v}</Link>,
        },
        {
          title: "Reference",
          target: "*",
          className: "fx-5",
          render: (v) => (
            <Link
              to={getUrl(routes.app.bookings.baseUrl + routes.details)}
              state={{ booking: v }}
            >
              {v.code}
            </Link>
          ),
        },
        {
          title: "Phone Number",
          target: "phoneNumber",
          render: (v) => <Link to="/">{v}</Link>,
        },
      ];

  useEffect(() => {
    if (!data.length) getBookings(from, to);

    // eslint-disable-next-line
  }, [from, to]);
  return (
    <Table
      onSearch={(q) => (q ? getBookingsSearch(q) : getBookings(from, to))}
      right={
        <select>
          <option value="recent">Recent Bookings</option>
          <option value="active">Active Bookings</option>
        </select>
      }
      showSearch={showSearch}
      loading={isLoading}
      title={title}
      data={data.length ? data : bookings}
      head={[
        {
          title: "#",
          target: "#",
          className: "count",
        },

        ...arr,
        //   {
        //     title: "From",
        //     target: "from",
        //     render: (v) => formatDate(v),
        //   },
        //   {
        //     title: "To",
        //     target: "to",
        //     render: (v) => formatDate(v),
        //   },
        {
          title: "Date",
          target: "createdAt",
          render: (v) => formatDate(new Date(v)),
        },
        {
          title: "Payment",
          target: "status",
          className: "fx-5",
          render: (v) => (
            <span className={`status ${v === "inactive" ? "false" : "true"}`}>
              {v !== "inactive" ? "PAID" : "NOT PAID"}
            </span>
          ),
        },
        {
          title: "On Hold",
          target: "onHold",
          className: "count",
          render: (v) => (
            <span className={`status ${v ? "false" : "true"}`}>
              {v ? "Yes" : "No"}
            </span>
          ),
        },
      ]}
    />
  );
};

export default Bookings;
