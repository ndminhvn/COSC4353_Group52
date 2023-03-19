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
  CircularProgress,
  Link,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import userIcon from "../../assets/user.png";
import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";

const userSchema = Yup.object({
  fullname: Yup.string()
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
  zipcode: Yup.string()
    .matches(
      /^\d{5}(?:[-\s]\d{4})?$/, //regex for zipcode: https://stackoverflow.com/questions/2577236/regex-for-zip-code
      "Please enter valid zip code (e.g. 12345 or 12345-6789)"
    )
    .required("Required"),
});

const theme = createTheme({
  palette: {
    text: {
      disabled: "main",
    },
  },
});

function ProfileForm() {
  // get username = token
  const username = getToken();

  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState();

  // fetch user profile
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/account/${username}`);
      // successfull request
      if (res.status === 200) {
        setUserData(Object.assign(userData, res.data));
        // console.log("initial data", userData);
      }
      if (userData.fullname) {
        setIsSubmitted(true);
      }
      setIsLoading(false);
    } catch (error) {
      setMessage(error.message.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // update user profile
  const updateUser = async (data) => {
    try {
      const res = await axios.put(`${BASE_URL}/account/${username}`, data);
      if (res.status === 201) {
        // console.log("new data", newProfile);
        return res.data;
      }
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  const initialValues = {
    fullname: userData?.fullname || "",
    address1: userData?.address1 || "",
    address2: userData?.address2 || "",
    city: userData?.city || "",
    state: userData?.state || "",
    zipcode: userData?.zipcode || "",
  };

  const handleSubmit = async (values) => {
    // Pass user input into update function to make PUT request
    const newProfile = await updateUser(values);
    setMessage("Profile updated!");
    setIsSubmitted(true);
  };

  return (
    <ThemeProvider theme={theme}>
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
            paddingX: 2,
            paddingY: 4,
          }}
        >
          <img src={userIcon} width={90} height={90} alt="user profile" />

          <Typography
            variant="h4"
            gutterBottom
            sx={{
              mt: 2,
              fontWeight: "bold",
              fontFamily: "Playfair Display",
              letterSpacing: "1px",
            }}
          >
            My Profile
          </Typography>
          {message && (
            <i
              style={{
                color: message === "Profile updated!" ? "green" : "red",
              }}
            >
              <p className="text-center">{message}</p>
            </i>
          )}

          <Box sx={{ m: 3 }}>
            {/* FORM STARTS */}
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Formik
                initialValues={initialValues}
                validationSchema={userSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomInput
                        name="fullname"
                        label="Full Name"
                        disabled={isSubmitted}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomInput
                        color="primary"
                        name="address1"
                        label="Address 1"
                        disabled={isSubmitted}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomInput
                        name="address2"
                        label="Address 2"
                        disabled={isSubmitted}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomInput
                        name="city"
                        label="City"
                        disabled={isSubmitted}
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CustomSelect
                        name="state"
                        label="State"
                        options={states}
                        disabled={isSubmitted}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomInput
                        name="zipcode"
                        label="Zip code"
                        disabled={isSubmitted}
                        required
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    spacing={2}
                    sx={{ mt: 2 }}
                  >
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitted}
                        size="large"
                        startIcon={<FileDownloadDoneIcon />}
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        disabled={!isSubmitted}
                        onClick={() => setIsSubmitted(false)}
                        size="large"
                        startIcon={<BorderColorOutlinedIcon />}
                      >
                        Edit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            )}
          </Box>
          {isSubmitted && (
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/quote" underline="hover" fontSize="large">
                  Get Fuel Quote
                  <ArrowForwardIosIcon fontSize="small" />
                </Link>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ProfileForm;
