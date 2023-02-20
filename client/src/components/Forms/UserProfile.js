import "./UserProfile.css";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect"

const onSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

function UserProfile() {
  const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO",
    "CT", "DE", "FL", "GA", "HI", "ID",
    "IL", "IN", "IA", "KS", "KY", "LA",
    "ME", "MD", "MA", "MI", "MN", "MS",
    "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK",
    "OR", "PA", "RI", "SC", "SD", "TN",
    "TX", "UT", "VT", "VA", "WA", "WV",
    "WI", "WY"
  ];

  const userSchema = Yup.object({
    name: Yup.string()
      .max(50, "Must be less than 50 characters")
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .required("Required"),
    address1: Yup.string()
      .max(100, "Must be less than 100 characters")
      .required("Required"),
    address2: Yup.string().max(100, "Must be less than 100 characters"),
    city: Yup.string()
      .max(100, "Must be less than 100 characters")
      .required("Required"),
    state: Yup.string()
      .max(2, "Invalid state")
      .required("Required")
      .oneOf(states, "Invalid state"),
    //regex for zipcode: https://stackoverflow.com/questions/2577236/regex-for-zip-code
    zip: Yup.string()
      // .min(5, "Must be at least 5 digits")
      // .max(10, "Must be at most 9 digits")
      .matches(
        /^\d{5}(?:[-\s]\d{4})?$/,
        "Please enter valid zip code (e.g. 12345 or 12345-6789)"
      )
      .required("Required"),
  });

  const initialValues = {
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  };

  const stateOptions = states.map((state, key) => (
    <option value={state} key={key}>
      {state}
    </option>
  ));

  return (
    <Formik 
      initialValues={initialValues} 
      validationSchema={userSchema}
      onSubmit={onSubmit}
    >
      {/* {(props) => ( */}
      {({ isSubmitting }) => (
        <div>
          <h1 className="text-center">My Profile</h1>
          <Form>
            <CustomInput label="Full Name" name="name" type="text" />
            <CustomInput label="Address 1" name="address1" type="text" />
            <CustomInput label="Address 2" name="address2" type="text" />
            <CustomInput label="City" name="city" type="text" />
            <CustomSelect label="State" name="state" type="text">
              <option value={""}>Select your state</option>
                {stateOptions}
            </CustomSelect>             
            <CustomInput label="Zip Code" name="zip" type="text" />
            <button className="btn btn-primary mt-3" disabled={isSubmitting} type="submit">
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default UserProfile;
