import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Form,
  Field,
  Formik,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
function App() {
  return (
    <>
      <h1>Form With Fommik & Yup mazing Simple</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirm: "",
          colors: "",
          message: "",
          availble: true,
          logistic: [],
          decision: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("name is required !")
            .min(6, "your name must be up then 6 charaters !"),
          email: Yup.string()
            .email("you shold type email address !")
            .required("email required !"),
          password: Yup.string().required("Please Enter your password"),
          confirm: Yup.string()
            .required("please match you passowrd ")
            .oneOf([Yup.ref("password"), null], "Passwords must  match"),
          colors: Yup.string()
            .required("colors required")
            .oneOf(
              ["red", "green", "blue", "other"],
              "please choose one favrote color",
            ),
          message: Yup.string()
            .min(20, "up then 20character")
            .required("message required"),
          availble: Yup.boolean().default(true).required("availble required"),

          logistic: Yup.array().required("required logistic"),
          decision: Yup.string()
            .oneOf(["no", "yes"])
            .required("you have to choose"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" id="name" placeholder="jhon Doe" />

              <ErrorMessage name="name" component={"p"} className="error" />
            </div>
            <div>
              <label htmlFor="email">email</label>
              <Field name="email" id="email" placeholder="jhonDoe@email.com" />

              <ErrorMessage name="email" component={"p"} className="error" />
            </div>
            <div>
              <label htmlFor="password">password</label>
              <Field name="password" id="password" placeholder="jhon Doe" />
              <ErrorMessage name="password" component={"p"} className="error" />
            </div>
            <div>
              <label htmlFor="confirm">confirm</label>

              <Field name="confirm" id="confirm" placeholder="jhon Doe" />

              <ErrorMessage name="confirm" component={"p"} className="error" />
            </div>
            <div>
              <label htmlFor="colors">colors</label>

              <Field name="colors" as="select" className="my-select">
                <option value="">Choose Color</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="other">other</option>
              </Field>

              <ErrorMessage name="colors" component={"p"} className="error" />
            </div>
            <div>
              <label htmlFor="message">message</label>

              <Field name="message" as="textarea" className="form-textarea" />

              <ErrorMessage name="message" component={"p"} className="error" />
            </div>
            <div>
              <label htmlFor="availble">availble</label>
              <Field name="availble" id="availble" type="checkbox" />
              <label htmlFor="availble">{values.availble.toString()}</label>
              <ErrorMessage name="availble" component={"p"} className="error" />
            </div>
            {values.availble && (
              <div>
                <label>
                  <b>set your date :</b>

                  <DatePickerField name="date" />
                </label>
              </div>
            )}
            <div>
              <h4>how you go to work uselly ?</h4>
              <label>
                <Field name="logistic" type="checkbox" value="walk" />
                <span>Walk</span>
              </label>
              <label>
                <Field name="logistic" type="checkbox" value="beciclete" />
                <span>beciclete</span>
              </label>
              <label>
                <Field name="logistic" type="checkbox" value="run" />
                <span>run</span>
              </label>
              <label>
                <Field name="logistic" type="checkbox" value="car" />
                <span>car</span>
              </label>
              <label>
                <Field name="logistic" type="checkbox" value="bus" />
                <span>bus</span>
              </label>
              <label>
                <Field name="logistic" type="checkbox" value="elecopter" />
                <span>elecopter</span>
              </label>

              <ErrorMessage name="logistic" component={"p"} className="error" />
            </div>
            <div>
              <h4>do you want to work?</h4>
              <label>
                <Field name="decision" type="radio" value="" />
                <span>no choice</span>
              </label>
              <label>
                <Field name="decision" type="radio" value="yes" />
                <span>yes</span>
              </label>
              <label>
                <Field name="decision" type="radio" value="no" />
                <span>no</span>
              </label>

              <ErrorMessage name="decision" component={"p"} className="error" />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};
export default App;
