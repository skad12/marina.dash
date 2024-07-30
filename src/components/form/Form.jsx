import { Formik } from "formik";

export default function Form({
  children,
  initialValues,
  onSubmit,
  validationSchema,
}) {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => children}
    </Formik>
  );
}
