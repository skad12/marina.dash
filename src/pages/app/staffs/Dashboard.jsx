import { useEffect, useState } from "react";
import Table from "../../../components/table/Table";
import useStaffs from "../../../hooks/api/useStaffs";
import Modal from "../../../components/Modal";
import { Form, FormInput, Submit } from "../../../components/form";
import { staffSchema } from "../../../validation/staffs";
import Switch from "../../../components/Switch";
import DisplayCard from "../../../components/DisplayCard";
import { svgs } from "../../../utils/svgs";
import banks from "../../../utils/banks";

const Staff = ({
  id,
  name,
  contact,
  email,
  active,
  addStaff,
  updateStaff,
  isLoading,
  accountNumber,
  bankName,
  role,
  agent,
}) => {
  const [selectedBank, setSelectedBank] = useState(bankName);
  const [available, setAvailable] = useState(id ? active : true);

  const handSubmit = (data) => {
    if (id) {
      updateStaff(id, {
        ...data,
        bankName: selectedBank,
        status: available ? "active" : "suspended",
        agent,
      });
    } else {
      addStaff({
        ...data,
        bankName: selectedBank,
        status: available ? "active" : "suspended",
        agent,
      });
    }
  };

  return (
    <div>
      <Form
        initialValues={{ name, email, contact, accountNumber, role }}
        validationSchema={staffSchema}
        onSubmit={handSubmit}
      >
        <FormInput placeholder="Name" name="name" />
        <FormInput placeholder="Email" type="email" name="email" />
        <FormInput placeholder="Contact" type="number" name="contact" />
        {!agent && <FormInput placeholder="Role" name="role" />}
        <div className="inputs">
          <div className="input">
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="">Bank Name</option>
              {banks.map((b, idx) => (
                <option value={b.bankName}>{b.bankName}</option>
              ))}
            </select>
          </div>
          <FormInput
            name="accountNumber"
            placeholder="Account Number"
            type="number"
          />
        </div>
        <div className="flex justify-between align-center">
          <div className="flex align-center">
            <span style={{ display: "block", marginRight: 10 }}>
              Is Active{" "}
            </span>

            <Switch isOn={available} setIsOn={setAvailable} />
          </div>
          {/* <div className="flex align-center">
            <span style={{ display: "block", marginRight: 10 }}>Is Agent </span>
            <Switch isOn={agent} />
          </div> */}
        </div>
        <br />
        <br />
        <Submit loading={isLoading} className="btn-submit" title="Save" />
      </Form>
    </div>
  );
};

function Dashboard(props) {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const { staffs, addStaff, updateStaff, getStaff, isLoading } = useStaffs();

  useEffect(() => {
    getStaff();

    // eslint-disable-next-lin
  }, []);

  return (
    <div>
      <div className="flex cards">
        <DisplayCard
          svg={svgs.account}
          value={staffs.length}
          title="Total staffs"
        />
        <DisplayCard
          svg={svgs.account}
          value={staffs.filter((a) => a.status === "active").length}
          title="Active Staffs"
        />
        <DisplayCard svg={svgs.calender} value={0} title="Current Schedules" />
      </div>
      <Table
        btn={{
          title: "ADD",
          onClick: () => setSelectedStaff({ agent: false }),
        }}
        head={[
          ...head,

          {
            title: "_",
            className: "count",
            target: "*",
            render: (v) => (
              <button onClick={() => setSelectedStaff(v)} className="anchor">
                view
              </button>
            ),
          },
        ]}
        title="Staffs"
        loading={isLoading}
        data={staffs.filter((s) => !s.agent)}
      />
      <br />
      <Table
        btn={{ title: "ADD", onClick: () => setSelectedStaff({ agent: true }) }}
        head={[
          ...head.slice(0, 3),
          ...head.slice(4, head.length - 1),
          {
            title: "_",
            className: "count",
            target: "*",
            render: (v) => (
              <button onClick={() => setSelectedStaff(v)} className="anchor">
                view
              </button>
            ),
          },
        ]}
        title="Agents"
        loading={isLoading}
        data={staffs.filter((s) => s.agent)}
      />
      <Modal visible={selectedStaff}>
        <div className="flex justify-between align-center">
          <h2 className="t-primary">{selectedStaff?.name}</h2>
          <button
            onClick={() => setSelectedStaff(null)}
            className="anchor modal-anchor f700"
          >
            close
          </button>
        </div>
        <br />
        <Staff
          accountNumber={selectedStaff?.accountNumber}
          bankName={selectedStaff?.bankName}
          agent={selectedStaff?.agent}
          contact={selectedStaff?.contact}
          email={selectedStaff?.email}
          active={selectedStaff?.status === "active"}
          id={selectedStaff?._id}
          isLoading={isLoading}
          addStaff={addStaff}
          updateStaff={updateStaff}
          name={selectedStaff?.name}
          role={selectedStaff?.role}
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
    title: "Email",
    target: "email",
  },
  {
    title: "Role",
    target: "role",
  },
  {
    title: "Account Number",
    target: "accountNumber",
  },
  {
    title: "Bank Name",
    target: "bankName",
  },
  {
    title: "Contact",
    target: "contact",
  },
  {
    title: "Status",
    target: "status",
    render: (v) => <span className={`status ${v}`}>{v}</span>,
  },
];
