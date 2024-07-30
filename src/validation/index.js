import * as Yup from "yup";

export const inventorySchema = Yup.object().shape({
  name: Yup.string().required(),
  quantity: Yup.string().required(),
  model: Yup.string().required(),
  condition: Yup.string().required(),
});
