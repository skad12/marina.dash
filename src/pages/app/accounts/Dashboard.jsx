import { useEffect, useState } from "react";
import useAccounts from "../../../hooks/api/useAccounts";
import Table from "../../../components/table/Table";
import Modal from "../../../components/Modal";
import { Form, FormInput, Submit } from "../../../components/form";
import Switch from "../../../components/Switch";
import Input from "../../../components/Input";

const Account = ({ account, id, addAccount, updateAccount, loading }) => {
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(id ? account.isActive : true);
  const [isSuper, setIsSuper] = useState(id ? account.isSuper : false);

  const handleSubmit = (data) => {
    data = { ...data, isActive, isSuper };
    if (id) updateAccount(id, password ? { ...data, password } : data);
    else addAccount({ ...data, password });
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          firstName: account?.firstName,
          lastName: account?.lastName,
          email: account?.email,
          phoneNumber: account?.phoneNumber,
        }}
      >
        <div className="inputs">
          <FormInput name="firstName" placeholder="First Name" />
          <FormInput name="lastName" placeholder="Last Name" />
        </div>
        <FormInput type="email" placeholder="Email Address" name="email" />
        <FormInput
          type="number"
          placeholder="Phone Number"
          name="phoneNumber"
        />
        <Input
          password
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />
        <div className="flex justify-between align-center">
          <div className="flex align-center">
            <span style={{ display: "block", marginRight: 10 }}>Active </span>

            <Switch isOn={isActive} setIsOn={setIsActive} />
          </div>
          <div className="flex align-center">
            <span style={{ display: "block", marginRight: 10 }}>
              Super Admin{" "}
            </span>
            <Switch isOn={isSuper} setIsOn={setIsSuper} />
          </div>
        </div>
        <br />
        <br />
        <Submit loading={loading} className="btn-submit" title="Save" />
      </Form>
    </div>
  );
};

function Dashboard(props) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { getAccounts, accounts, isLoading, updateAccount, addAccount } =
    useAccounts();
  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div>
      <Table
        btn={{
          title: "ADD",
          onClick: () => setSelectedAccount({}),
        }}
        head={[
          ...head,
          {
            title: "_",
            className: "count",
            target: "*",
            render: (v) => (
              <button onClick={() => setSelectedAccount(v)} className="anchor">
                view
              </button>
            ),
          },
        ]}
        title="Accounts"
        data={accounts}
        loading={isLoading}
      />
      <Modal visible={selectedAccount}>
        <div className="flex justify-between align-center">
          <h2 className="t-primary">
            {selectedAccount?.firstName} {selectedAccount?.lastName}
          </h2>
          <button
            onClick={() => setSelectedAccount(null)}
            className="anchor modal-anchor f700"
          >
            close
          </button>
        </div>
        <br />
        <Account
          loading={isLoading}
          updateAccount={updateAccount}
          addAccount={addAccount}
          account={selectedAccount}
          id={selectedAccount?._id}
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
    target: ["firstName", "lastName"],
    redner: (v) => v.join(" "),
  },
  {
    title: "Email",
    target: "email",
  },
  {
    title: "Phone Number",
    target: "phoneNumber",
  },
  {
    title: "Active",
    target: "isActive",
    render: (v) => (
      <span className={`status ${v.toString()}`}>{v.toString()}</span>
    ),
  },
  {
    title: "Super Admin",
    target: "isSuper",
    render: (v) => (
      <span className={`status ${v.toString()}`}>{v.toString()}</span>
    ),
  },
];
