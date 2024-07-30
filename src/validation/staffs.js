import * as Yup from "yup";

export const staffSchema = Yup.object().shape({
  email: Yup.string().required().label("Email").email(),
  name: Yup.string().required().label("Name"),
  contact: Yup.string().required().label("Contact"),
  accountNumber: Yup.number().required().label("Account Number"),
  role: Yup.string(),
});

export const codeSchema = Yup.object().shape({
  expiring: Yup.date().required().label("Expiring"),
  maxUsage: Yup.number().required().label("Max Usage"),
  discount: Yup.number().required().label("Discount"),
  compensation: Yup.number(),
});
