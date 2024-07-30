import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().required().label("Email").email(),
  password: Yup.string().required().label("Password"),
});
