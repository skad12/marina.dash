import { excludeFromObject, formatDate, getDatesBetween } from "../../../utils";
import Table from "../../../components/table/Table";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import { useEffect, useState } from "react";
import useStaffs from "../../../hooks/api/useStaffs";
import useTakss from "../../../hooks/api/useTasks";

const Task = ({ staffs, title, edit, id, remove }) => {
  return (
    <div>
      <div className="flex">
        <div style={{ width: "70%", marginRight: 10 }}>
          <Input
            value={title}
            onChange={(v) => edit(v, "title")}
            placeholder="Description"
          />
        </div>
        <div>
          <select onChange={(v) => edit(v.target.value, "staff")}>
            <option>Select Staff</option>
            {staffs.map((a, idx) => (
              <option value={a._id} key={idx}>
                {a.name} - ({a.email})
              </option>
            ))}
          </select>
          <select onChange={(v) => edit(v.target.value, "shift")}>
            <option>Shift</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
          </select>
        </div>
        <button onClick={remove} className="trash">
          <svg
            width="384"
            height="449"
            viewBox="0 0 384 449"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M383.551 64.0146H272.001V16.0146C272.001 11.7712 270.316 7.70152 267.315 4.70094C264.315 1.70036 260.245 0.0146484 256.001 0.0146484H128.001C123.758 0.0146484 119.688 1.70036 116.688 4.70094C113.687 7.70152 112.001 11.7712 112.001 16.0146V64.0146H0.451462L0.00146484 104.015H33.0015L53.0915 418.015C53.6 426.135 57.1823 433.756 63.11 439.329C69.0377 444.902 76.8655 448.008 85.0015 448.015H299.001C307.133 448.014 314.959 444.917 320.889 439.354C326.82 433.791 330.411 426.179 330.931 418.065L351.001 104.015H384.001L383.551 64.0146ZM112.001 384.015L103.001 128.015H136.001L145.001 384.015H112.001ZM208.001 384.015H176.001V128.015H208.001V384.015ZM232.001 64.0146H152.001V36.0146C152.001 34.9538 152.423 33.9364 153.173 33.1862C153.923 32.4361 154.941 32.0146 156.001 32.0146H228.001C229.062 32.0146 230.08 32.4361 230.83 33.1862C231.58 33.9364 232.001 34.9538 232.001 36.0146V64.0146ZM272.001 384.015H239.001L248.001 128.015H281.001L272.001 384.015Z"
              fill="#f44336"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const RenderDay = ({ date, staffs, update }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    update(tasks);
  }, [tasks]);

  return (
    <div className="card task-d">
      <div className="flex justify-between">
        <h4 className="t-primary">{formatDate(date)}</h4>
        <Button
          onClick={() =>
            setTasks([
              ...tasks,
              {
                id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                staff: null,
                title: "",
                shift: "",
                date,
              },
            ])
          }
          className="btn-add suspended"
          title="Add Task"
        />
      </div>
      {tasks.map((t, idx) => (
        <Task
          staffs={staffs}
          {...t}
          edit={(v, field) => {
            setTasks([
              ...tasks.map((_) => {
                if (_.id === t.id) _[field] = v;
                return _;
              }),
            ]);
          }}
          remove={() => setTasks([...tasks.filter((_) => _.id !== t.id)])}
          key={idx}
        />
      ))}
    </div>
  );
};

const filters = {
  today: "today",
  completed: "completed",
  pending: "pending",
};

function Dashboard(props) {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [filter, setFilter] = useState(filters.today);
  const { isLoading, getStaff, staffs } = useStaffs();
  const [from, setFrom] = useState(null);
  const [dates, setDates] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [to, setTo] = useState(null);

  const {
    isLoading: tasksLoading,
    addTasks,
    getTasks,
    tasks: dbTasks,
    completeTask,
  } = useTakss();

  const handleSave = async () =>
    addTasks({ tasks: tasks.map((t) => excludeFromObject(["id"], t)) });

  useEffect(() => {
    if (from && to) {
      setDates(getDatesBetween(from, to));
    }
  }, [from, to]);

  useEffect(() => {
    getStaff();
  }, []);

  useEffect(() => {
    getTasks(filter);
  }, [filter]);

  return (
    <div>
      <Table
        showSearch={false}
        right={
          <select onChange={(v) => setFilter(v.target.value)}>
            <option value={filters.today}>Today's Tasks</option>
            <option value={filters.completed}>Completed</option>
            <option value={filters.pending}>Pending</option>
          </select>
        }
        loading={isLoading || tasksLoading}
        btn={{
          title: "ADD",
          onClick: () => setSelectedSchedule({ agent: false }),
        }}
        head={[
          ...head,
          {
            title: "_",
            className: "count",
            target: "*",
            render: (v) => (
              <button
                disabled={v.completed}
                onClick={() => completeTask(v._id)}
                className="btn-rm2"
              >
                mark as completed
              </button>
            ),
          },
        ]}
        title="Schedules"
        data={dbTasks}
      />
      <Modal visible={selectedSchedule}>
        <div className="flex justify-between align-center">
          <h2 className="t-primary">{selectedSchedule?.name}</h2>
          <button
            onClick={() => setSelectedSchedule(null)}
            className="anchor modal-anchor f700"
          >
            close
          </button>
        </div>
        <br />
        <div className="inputs">
          <Input value={from} onChange={setFrom} type="date" />
          <Input value={to} onChange={setTo} type="date" />
        </div>
        {dates.map((d, idx) => (
          <RenderDay
            update={setTasks}
            staffs={staffs.filter((s) => !s.agent)}
            key={idx}
            date={d}
          />
        ))}
        <br />
        <Button
          loading={tasksLoading}
          onClick={handleSave}
          disabled={!tasks.length || !dates.length}
          className="btn-submit"
          title="Save"
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
    title: "Staff",
    target: "staff.name",
  },
  {
    title: "Description",
    target: "title",
  },
  {
    title: "Shift",
    target: "shift",
    render: (v) => v || "-",
  },
  {
    title: "Status",
    target: "completed",
    render: (v) => (
      <span className={`status ${v.toString()}`}>
        {v ? "Completed" : "Pending"}
      </span>
    ),
  },
  {
    title: "Date",
    target: "date",
    render: formatDate,
  },
  {
    title: "Date Assigned",
    target: "createdAt",
    render: formatDate,
  },
];
