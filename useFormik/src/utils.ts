import { FormikProps } from "formik";
import { Option, UserInfo } from "./types";
import * as yup from "yup";
import { get } from "lodash";

export const initialValues: UserInfo = {
  personal: {
    name: "",
    lastName: "",
    age: 0,
  },
  location: {
    address: "",
    country: "",
  },
};

export const validationSchema = yup.object().shape({
  personal: yup.object().shape({
    name: yup.string().required("Name is required"),
    lastName: yup.string().required("Last name is required"),
    age: yup
      .number()
      .required("Age is required")
      .min(1, "You should be at least 1 year old"),
  }),
  location: yup.object().shape({
    address: yup.string().required("Address is required"),
    country: yup.string().required("Country is required"),
  }),
});

export const isInvalid = (name: string, formik: FormikProps<UserInfo>) =>
  !!(get(formik.touched, name) && get(formik.errors, name));

export const countries: Option<string>[] = [
  {
    label: "Guatemala",
    value: "Guatemala",
  },
  {
    label: "United States",
    value: "United States",
  },
  {
    label: "Canada",
    value: "Canada",
  },
];
