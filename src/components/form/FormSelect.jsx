import { useFormikContext } from "formik";
import Select from "../Input";
import { useEffect } from "react";

export default function FormSelect({
  name,
  dependent,
  onDependentChange,
  onChangeListener,
  ...others
}) {
  const { setFieldTouched, errors, touched, setFieldValue, values } =
    useFormikContext();
  useEffect(() => {
    if (dependent && typeof onDependentChange === "function")
      onDependentChange(values[dependent]);
    // eslint-disable-next-line
  }, [values]);

  // useEffect(() => {
  //   if (typeof onChangeListener === "function") onChangeListener(values[name]);
  // }, [values[name]]);

  return (
    <Select
      {...others}
      errorMessage={errors[name] && touched[name] ? errors[name] : null}
      onBlur={() => setFieldTouched(name)}
      onSelect={(value) => {
        setFieldValue(name, value);
        if (onChangeListener) onChangeListener(value);
      }}
    />
  );
}
