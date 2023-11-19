import { FC } from "react";
import { Option } from "../types";
import { InputProps, MBaseInput } from "./MBaseInput";
import { Dropdown } from "primereact/dropdown";
import { get } from "lodash";
import { classNames } from "primereact/utils";
import { isInvalid } from "../utils";

export const MDropdown: FC<MDropdownProps> = (props) => {
  const { name, formik, options } = props;

  return (
    <MBaseInput {...props}>
      <Dropdown
        id={name}
        name={name}
        options={options}
        value={get(formik.values, name)}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={classNames({
          "p-invalid": isInvalid(name, formik),
          "w-full": true,
        })}
      />
    </MBaseInput>
  );
};

interface MDropdownProps extends InputProps {
  options: Option<any>[];
}
