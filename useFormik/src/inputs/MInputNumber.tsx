import { FC } from "react";
import { InputProps, MBaseInput } from "./MBaseInput";
import { InputNumber } from "primereact/inputnumber";
import { get } from "lodash";
import { classNames } from "primereact/utils";
import { isInvalid } from "../utils";

export const MInputNumber: FC<InputProps> = (props) => {
  const { name, formik } = props;

  return (
    <MBaseInput {...props}>
      <InputNumber
        id={name}
        name={name}
        value={get(formik.values, name)}
        onValueChange={formik.handleChange}
        onBlur={formik.handleBlur}
        useGrouping={false}
        inputClassName={classNames({ "p-invalid": isInvalid(name, formik) })}
      />
    </MBaseInput>
  );
};
