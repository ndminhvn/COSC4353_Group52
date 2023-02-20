// - Full Name (50 characters, required)
// - Address 1 (100 characters, required)
// - Address 2 (100 characters, optional)
// - City (100 characters, required)
// - State (Drop Down, selection required) DB will store 2 character state code
// - Zip Code (9 characters, at least 5 character code required)
//import './UserProfile.css';
import * as Yup from 'yup';
import { Formik, Form } from "formik";
import CustomInput from './CustomInput';

function UserProfile() {
  const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN',
  'MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK',
  'OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']

  const userSchema = Yup.object({
    name: Yup.string()
      .max(50, "Must be less than 50 characters")
      .required("Required"),
    address1: Yup.string()
      .max(100, "Must be less than 100 characters")
      .required("Required"),
    address2: Yup.string()
      .max(100, "Must be less than 100 characters"),
    city: Yup.string()
      .max(100, "Must be less than 100 characters")
      .required("Required"),
    state: Yup.string()
      .required("Required")
      .oneOf(states),
    zip: Yup.string()
      .min(5, "Must be at least 5 digits")
      .max(9)
      .required("Required")
  })

  const initialValues = {
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: ""
  }

  // const stateOptions = states.map((state, key) => (
  //   <option value={state} key={key}>
  //     {state}
  //   </option>
  // ));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userSchema}
    >
      {formik => (
        <div>
          <h1>My Profile</h1>
          {console.log(formik.values)}
          <Form>
            <CustomInput label="Full Name" name="name" type="text"/>
            <CustomInput label="Address 1" name="address1" type="text"/>
            <CustomInput label="Address 2" name="address2" type="text"/>
            <CustomInput label="City" name="city" type="text"/>
            <CustomInput label="State" name="state" type="text"/>
            <CustomInput label="Zipcode" name="zip" type="text"/>
            <button className='btn btn-primary mt-3' type='submit'>Submit</button>
          </Form>
        </div>
      )}
    </Formik>
  )
          {/* <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={(values) => {
              console.log(values)
              alert("Form is validated! Submitting the form...")
            }}
          >
            {({ touched, errors, isSubmitting, values }) =>
                !isSubmitting ? (
                  <div className='row mb-5'>
                    <div className='col-lg-12 text-center'>
                      <h1 className="mt-5">Your Profile</h1>
                    </div>
                    <div>
                      <Form>
                        <div className="form-group">
                          <label htmlFor='name'>Full Name</label>
                          <Field
                            type="name"
                            name="name"
                            placeholder="Enter full name"
                            className={`mt-2 form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                          />
                          <ErrorMessage 
                            component="div"
                            name="name"
                            className='invalid-feedback'

                          />
              
                        </div>
                        <button
                        type="submit"
                        className="btn btn-primary btn-block mt-4"
                      >
                        Submit
                      </button>
                      </Form>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="p-3 mt-5">Form Submitted</h1>
                    <div className="alert alert-success mt-3">
                      Your profile is updated!
                    </div>
                    <p>Full Name: {values.name}</p>
                  </div>
                  
                )}
          </Formik> */}
  
}

export default UserProfile

