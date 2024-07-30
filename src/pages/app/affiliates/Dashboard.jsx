import { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import useDiscounts from "../../../hooks/api/useDiscounts";
import { formatDate, numberFormatter } from "../../../utils";
import Modal from "../../../components/Modal";
import { Form, FormInput, Submit } from "../../../components/form";
import Switch from "../../../components/Switch";
import useStaffs from "../../../hooks/api/useStaffs";
import { codeSchema } from "../../../validation/staffs";
import Bookings from "../../../components/table/active/Bookings";

const Code = ({
  _id,
  expiring,
  maxUsage,
  active,
  discountType,
  discount,
  staffs,
  isLoading,
  addDiscountCode,
  bookings = [],
  compensation,
}) => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [discountTypeS, setDiscountType] = useState(
    discountType || "percentage"
  );
  const [available, setAvailable] = useState(_id ? active : true);
  const handleSubmit = (data) => {
    if (_id) {
    } else
      addDiscountCode({
        ...data,
        agent: selectedStaff,
        discountType: discountTypeS,
      });
  };
  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        validationSchema={codeSchema}
        initialValues={{
          expiring,
          maxUsage,
          discount,
          compensation,
        }}
      >
        <FormInput
          disabled={_id}
          name="expiring"
          type="date"
          placeholder="Expiring"
        />
        <FormInput
          disabled={_id}
          name="maxUsage"
          type="number"
          placeholder="Max Usage"
        />
        <FormInput
          disabled={_id}
          name="discount"
          type="Number"
          placeholder="Discount"
        />
        {selectedStaff && (
          <FormInput
            type="Number"
            placeholder="Compensation"
            disabled={_id}
            name="compensation"
          />
        )}
        <div className="flex align-center">
          <span style={{ display: "block", marginRight: 10 }}>Is Active </span>

          <Switch isOn={available} setIsOn={setAvailable} />
        </div>
        <br />
        {!_id && (
          <div className="flex justify-between align-center">
            <select
              onChange={(v) => setDiscountType(v.target.value)}
              value={discountTypeS}
            >
              <option value="percentage">Percentage</option>
              <option value="flat">Flat</option>
            </select>
            <select
              onChange={(v) => setSelectedStaff(v.target.value)}
              value={selectedStaff}
            >
              <option value="">Select Agent (Optional)</option>
              {staffs.map((s, idx) => (
                <option key={idx} value={s._id}>
                  {s.name} - {s.contact}
                </option>
              ))}
            </select>
          </div>
        )}
        <br />
        <Submit loading={isLoading} className="btn-submit" title="Save" />
        {_id && bookings.length ? (
          <div>
            <Bookings data={bookings} />
          </div>
        ) : null}
      </Form>
    </div>
  );
};

function Dashboard(props) {
  const [selectedCode, setSelectedCode] = useState(null);
  const { getDiscounts, codes, isLoading, addDiscountCode } = useDiscounts();
  const { getStaff, isLoading: isLoading2, staffs } = useStaffs();
  useEffect(() => {
    getDiscounts();
    getStaff();
  }, []);
  return (
    <div>
      <Table
        btn={{ title: "ADD", onClick: () => setSelectedCode({}) }}
        head={[
          ...head,
          {
            title: "_",
            className: "count",
            target: "*",
            render: (v) => (
              <button onClick={() => setSelectedCode(v)} className="anchor">
                view
              </button>
            ),
          },
        ]}
        loading={isLoading || isLoading2}
        data={codes}
        title="Discount Codes"
      />
      <Modal visible={selectedCode}>
        <div className="flex justify-between align-center">
          <h2 className="t-primary">
            {selectedCode?.code}{" "}
            {selectedCode?.agent
              ? `(${selectedCode.agent.name} - ${selectedCode.agent.contact})`
              : ""}
          </h2>
          <button
            onClick={() => setSelectedCode(null)}
            className="anchor modal-anchor f700"
          >
            close
          </button>
        </div>
        <br />
        <Code
          {...selectedCode}
          isLoading={isLoading}
          addDiscountCode={addDiscountCode}
          staffs={staffs.filter((s) => s.agent)}
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
    title: "Code",
    target: "code",
  },
  {
    title: "Max Usage",
    target: "maxUsage",
  },
  {
    title: "Discount",
    target: ["discount", "discountType"],
    render: (v) => (v[1] === "flat" ? numberFormatter(v[0]) : `${v[0]}%`),
  },
  {
    title: "Expiring",
    target: "expiring",
    render: formatDate,
  },
  {
    title: "Created",
    target: "createdAt",
    render: formatDate,
  },
  {
    title: "Is Active",
    target: "active",
    render: (v) => <span className={`status ${v}`}>{v.toString()}</span>,
  },
];

// const bookingsHead = [
//   {
//     title: "#",
//     target: "#",
//     className: "count",
//   },
//   {
//     title: 'Customer',
//     target:
//   }
// ];
