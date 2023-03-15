import axios from "axios";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { getToken } from "../../utils/useToken";
import { BASE_URL } from '../../utils/constants.js';
import { states } from "../../utils/states";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import "./UserProfile.css";

function UserProfile() {

  // get username/token
  const token = getToken()
  console.log(token)

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
    zip: Yup.string()
      .matches(
        /^\d{5}(?:[-\s]\d{4})?$/, //regex for zipcode: https://stackoverflow.com/questions/2577236/regex-for-zip-code
        "Please enter valid zip code (e.g. 12345 or 12345-6789)"
      )
      .required("Required"),
  });

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  // get API
  const fetchProfileData = async () => {
    // try {
    //   const response = await axios.get(`${BASE_URL}/account/${token}`);
    //   console.log(response.data);
    // }
    // catch (error) {
    //   console.log(error)
    // }
  };

  const handleSubmit = async(data) => {
    // try {
    //   const response = await axios.post(`${BASE_URL}/account/${token}`, data);
    //   console.log(response.data);
    // }
    // catch (error) {
    //   console.log(error)
    // }
  };

  const handleUpdate = async(data) => {
    // try {
    //   const response = await axios.put(`${BASE_URL}/account/${token}`, data);
    //   console.log(response.data);
    // }
    // catch (error) {
    //   console.log(error)
    // }
  };
  
  // useEffect(() => {

  // }, [])
  
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
      {/* isSubmitting is one of the props */}
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
