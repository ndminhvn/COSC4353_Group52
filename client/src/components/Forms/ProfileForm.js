import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, useFormik } from "formik";
import { useState, useEffect } from "react";
import { getToken } from "../../utils/useToken";
import { BASE_URL } from "../../utils/constants.js";
import { states } from "../../utils/states";
import { Container, Grid, Typography, Box, Button, CircularProgress } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";

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

function ProfileForm() {
  // get username = token
  const username = getToken();

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditted, setIsEditted] = useState(false);

  // fetch user profile
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/account/${username}`);
      if (res.status === 201) {
        setUserData(Object.assign(userData, res.data));
        console.log("user data", userData); // data fetched from database
      }
      setIsLoading(false);
    } catch (error) {
      alert("Failed to fetch data");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // update user profile
  const updateData = async (data) => {
    try {
      const res = await axios.put(`${BASE_URL}/account/${username}`, data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    name: userData?.fullname || "",
    address1: userData?.address1 || "",
    address2: userData?.address2 || "",
    city: userData?.city || "",
    state: userData?.state || "",
    zip: userData?.zipcode || "",
  };

  const handleSubmit = (values) => {
    console.log(values);
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
          bgcolor: "background.paper",
          boxShadow: 2,
          borderRadius: 2,
          p: 4,
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
        <Box sx={{ mt: 3 }}>
          {/* FORM STARTS */}
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={userSchema}
              // enableReinitialize
              onSubmit={handleSubmit}
            >
              <Form>
                <Grid container spacing={2}>
                  {/* Full name */}
                  <Grid item xs={12}>
                    <CustomInput name="name" label="Full Name" required />
                  </Grid>
                  {/* Address 1 */}
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
                    <CustomSelect
                      name="state"
                      label="State"
                      options={states}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomInput name="zip" label="Zip code" required />
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="flex-end"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitted}
                    >
                      Save
                    </Button>
                  </Grid>
                  {/* <Grid item>
                <Button 
                type="submit" 
                disabled={isEditted}
                onClick={handleEdit}
                variant="contained">
                  Edit
                </Button>
              </Grid> */}
                </Grid>
              </Form>
            </Formik>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default ProfileForm;
