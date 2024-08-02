import { Link } from "react-router-dom";
import Table from "../../../components/table/Table";
import { numberFormatter } from "../../../utils";
import DisplayCard from "../../../components/DisplayCard";
import { Fragment, useContext, useState } from "react";
import DataContext from "../../../contexts/DataContext";
import { svgs } from "../../../utils/svgs";
import routes, { getUrl } from "../../../utils/routes";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Switch from "../../../components/Switch";
import Button from "../../../components/Button";
import useApartments from "../../../hooks/api/useApartments";

const Apartment = ({ iname, id, iprice, active }) => {
  const [name, setName] = useState(iname);
  const [price, setPrice] = useState(iprice || 100000);
  const [available, setAvailable] = useState(id ? active : true);
  const { isLoading, addApartment, updatepartment } = useApartments();

  const handleClick = () => {
    if (id) {
      updatepartment(id, { name, pricePerNight: price, available });
    } else {
      addApartment({ name, pricePerNight: price, available });
    }
  };

  return (
    // popup add apartments
    <div>
      <Input placeholder="Apartment Name" value={name} onChange={setName} />
      <Input
        placeholder="Price per night"
        value={price}
        onChange={setPrice}
        type="number"
      />
      <Switch isOn={available} setIsOn={setAvailable} />
      <br />
      <br />
      <Button
        loading={isLoading}
        onClick={handleClick}
        disabled={!name || !price}
        className="btn-submit"
        title="Save"
      />
    </div>
  );
};

function Dashboard(props) {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const { apartments } = useContext(DataContext);
  return (
    <div>
      <div className="flex cards">
        <DisplayCard
          svg={svgs.bed}
          value={apartments.length}
          title="Total apartments"
        />
        <DisplayCard
          svg={svgs.bed}
          value={apartments.filter((a) => a.available).length}
          title="Available apartments"
        />
        <DisplayCard
          svg={svgs.bed}
          value={apartments.filter((a) => a.currentBooking).length}
          title="Currently Booked"
        />
      </div>
      <Table
        btn={{ title: "ADD", onClick: () => setSelectedApartment({}) }}
        title="Bookings"
        data={apartments}
        head={[
          ...head,
          {
            title: "_",
            className: "count",
            target: "*",
            render: (v) => (
              <button
                onClick={() => setSelectedApartment(v)}
                className="anchor"
              >
                view
              </button>
            ),
          },
        ]}
      />
      <Modal visible={selectedApartment}>
        <div className="flex justify-between align-center">
          <h2 className="t-primary">{selectedApartment?.name}</h2>
          <button
            onClick={() => setSelectedApartment(null)}
            className="anchor modal-anchor f700"
          >
            close
          </button>
        </div>
        <br />
        <Apartment
          iprice={selectedApartment?.pricePerNight}
          id={selectedApartment?._id}
          iname={selectedApartment?.name}
          active={selectedApartment?.available}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;

const head = [
  {
    title: "#",
    target: "#",
    className: "count",
  },
  {
    title: "Name",
    target: "name",
  },
  {
    title: "Current Booking",
    target: "currentBooking",
    render: (v) =>
      v ? (
        <Link
          to={getUrl(routes.app.bookings.baseUrl + routes.details)}
          state={{ booking: v }}
        >
          {v.code}
        </Link>
      ) : (
        <span className="italic">N/A</span>
      ),
  },
  {
    title: "Queed Bookings",
    target: "nextBookings",
    render: (v) =>
      v.length ? (
        v.map((b, idx) => (
          <Fragment key={idx}>
            <Link
              to={getUrl(routes.app.bookings.baseUrl + routes.details)}
              state={{ booking: b }}
            >
              {b.code}
            </Link>
            ,{" "}
          </Fragment>
        ))
      ) : (
        <span className="italic">N/A</span>
      ),
  },
  {
    title: "Status",
    target: "available",
    render: (v) => (
      <span className={`status ${v.toString()}`}>
        {v ? "Available" : "Not Available"}
      </span>
    ),
  },
  {
    title: "Price/Night",
    target: "pricePerNight",
    render: (v) => numberFormatter(v),
  },
];
