import { useEffect, useState } from "react";
import useInventory from "../../../hooks/api/useInventory";
import Table from "../../../components/table/Table";
import Modal from "../../../components/Modal";
import { Form, FormInput, Submit } from "../../../components/form";
import { inventorySchema } from "../../../validation";

const Item = ({ loading, id, item, updateInventory, addToInventory }) => {
  const handleSubmit = (data) => {
    if (id) updateInventory(id, data);
    else addToInventory(data);
  };
  return (
    <Form
      validationSchema={inventorySchema}
      onSubmit={handleSubmit}
      initialValues={{
        name: item?.name,
        quantity: item?.quantity,
        model: item?.model,
        condition: item?.condition,
      }}
    >
      <FormInput name="name" placeholder="Name" />
      <FormInput name="quantity" placeholder="Quantity" type="number" />
      <FormInput name="model" placeholder="Model" />
      <FormInput name="condition" placeholder="Condition" />
      <Submit loading={loading} className="btn-submit" title="Save" />
    </Form>
  );
};

function Dashboard(props) {
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    inventory,
    isLoading,
    getInventory,
    updateInventory,
    addToInventory,
  } = useInventory();

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div>
      <Table
        btn={{
          title: "ADD",
          onClick: () => setSelectedItem({}),
        }}
        head={[
          ...head,
          {
            title: "_",
            className: "count",
            target: "*",
            render: (v) => (
              <button onClick={() => setSelectedItem(v)} className="anchor">
                view
              </button>
            ),
          },
        ]}
        title="Inventory"
        data={inventory}
        loading={isLoading}
      />
      <Modal visible={selectedItem}>
        <div className="flex justify-between align-center">
          <h2 className="t-primary">{selectedItem?.name}</h2>
          <button
            onClick={() => setSelectedItem(null)}
            className="anchor modal-anchor f700"
          >
            close
          </button>
        </div>
        <br />
        <Item
          loading={isLoading}
          updateInventory={updateInventory}
          addToInventory={addToInventory}
          item={selectedItem}
          id={selectedItem?._id}
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
    title: "Item",
    target: "name",
  },
  {
    title: "Quantity",
    target: "quantity",
  },
  {
    title: "Model",
    target: "model",
  },
  {
    title: "Condition",
    target: "condition",
  },
];
