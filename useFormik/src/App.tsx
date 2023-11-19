import { useFormik } from "formik";
import "./App.css";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { UserInfo } from "./types";
import { countries, initialValues, validationSchema } from "./utils";
import { MDropdown, MInputNumber, MInputText } from "./inputs";
import { useRef } from "react";

function App() {
  const toast = useRef<Toast>(null);

  const formik = useFormik<UserInfo>({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("values: ", values);
      toast.current?.show({
        severity: "success",
        summary: "Form submitted",
        detail: "The form was submitted",
      });
      resetForm();
    },
  });

  return (
    <div className="App">
      <Toast ref={toast} />
      <form
        className="w-full h-full flex flex-column align-items-center"
        onSubmit={formik.handleSubmit}
      >
        <h1>useFormik with nested objects</h1>
        <h2>Personal Info</h2>
        <div className="flex flex-column gap-4">
          <MInputText name="personal.name" label="Name" formik={formik} />
          <MInputText
            name="personal.lastName"
            label="Last name"
            formik={formik}
          />
          <MInputNumber name="personal.age" label="Age" formik={formik} />
        </div>
        <h2>Address Info</h2>
        <div className="flex flex-column gap-4">
          <MInputText name="location.address" label="Address" formik={formik} />
          <MDropdown
            name="location.country"
            label="Country"
            formik={formik}
            options={countries}
          />
        </div>
        <Button label="Send Form" type="submit" className="mt-4" />
      </form>
    </div>
  );
}

export default App;
