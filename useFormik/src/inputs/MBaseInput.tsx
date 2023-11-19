import { FormikProps } from "formik";
import { UserInfo } from "../types";
import { FC, ReactNode } from "react";
import { isInvalid } from "../utils";
import { get } from "lodash";

export const MBaseInput: FC<MBaseInputProps & InputProps> = ({
  children,
  formik,
  label,
  name,
}) => {
  const getErrorMessage = () =>
    isInvalid(name, formik) && (
      <small className="p-error">{get(formik.errors, name)}</small>
    );

  return (
    <div className="flex flex-column w-full">
      <span className="p-float-label">
        {children}
        <label htmlFor={name}>{label}</label>
      </span>
      {getErrorMessage()}
    </div>
  );
};

export interface InputProps {
  name: string;
  label: string;
  formik: FormikProps<UserInfo>;
}

interface MBaseInputProps {
  children: ReactNode;
}
