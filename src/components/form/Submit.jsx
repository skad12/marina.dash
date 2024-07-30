import { useFormikContext } from "formik";
import Button from "../Button";

export default function Submit({ Wrapper = Button, disabled, ...others }) {
  const { handleSubmit, isValid } = useFormikContext();
  return (
    <Wrapper
      {...others}
      type="submit"
      disabled={!isValid || disabled}
      onClick={handleSubmit}
    />
  );
}
