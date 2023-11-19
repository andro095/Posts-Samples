import { FC } from "react";
import { MBaseInput, InputProps } from "./MBaseInput";
import { InputText } from "primereact/inputtext";
import { get } from "lodash";
import { classNames } from "primereact/utils";
import { isInvalid } from "../utils";

export const MInputText: FC<InputProps> = (props) => {
  const { name, formik } = props;

  return (
    <MBaseInput {...props}>
      <InputText
        id={name}
        name={name}
        value={get(formik.values, name)}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={classNames({ "p-invalid": isInvalid(name, formik) })}
      />
    </MBaseInput>
  );
};
