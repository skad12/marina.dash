import { useEffect } from "react";
import Input from "../Input";
import { useFormikContext } from "formik";

export default function FormInput({ name, value, listener, ...others }) {
  const { setFieldTouched, errors, touched, setFieldValue, values } =
    useFormikContext();

  useEffect(() => {
    if (value) setFieldValue(name, value);
    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    if (typeof listener === "function") listener(values[name]);
    // eslint-disable-next-line
  }, [values[name]]);

  return (
    <Input
      {...others}
      errorMessage={errors[name] && touched[name] ? errors[name] : null}
      onBlur={() => setFieldTouched(name)}
      onChange={(value) => setFieldValue(name, value)}
      value={values[name]}
    />
  );
}
