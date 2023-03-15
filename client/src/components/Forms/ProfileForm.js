import axios from "axios";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { getToken } from "../../utils/useToken";
import { BASE_URL } from "../../utils/constants.js";
import { states } from "../../utils/states";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";

function ProfileForm() {
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

  const initialValues = {
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  };

  const handleSubmit = (e) => {
    
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: 'background.paper',
          boxShadow: 2,
          borderRadius: 2,
          p: 4
        }}
      >
        <PersonPinIcon style={{ fontSize: "80px" }} />
        <Typography 
        variant="h4" 
        sx={{
          fontWeight: "bold",
          fontFamily: "Playfair Display",
          letterSpacing: "1px",
        }}
        >
          My Profile
        </Typography>

        {/* FORM */}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomInput name="name" label="Full Name" required />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput name="address1" label="Address 1" required />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput name="address2" label="Address 2" />
                </Grid>
                <Grid item xs={6}>
                  <CustomInput name="city" label="City" required />
                </Grid>
                <Grid item xs={6}>
                  <CustomSelect name="state" label="State" options={states} required />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput name="zip" label="Zip code" required />
                </Grid>
              </Grid>
            </Form>
          </Formik>
          {/* FORM ENDS */}
          <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 2 }}>
            <Grid item>
              <Button 
              variant="contained"
              onClick={handleSubmit}
              // disabled={isSubmitting}
              >
                Submit
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" disabled variant="contained">
                Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default ProfileForm;
