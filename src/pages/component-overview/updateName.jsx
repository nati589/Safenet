import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

// material-ui
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import { postData } from 'api/api';
import { LOGIN } from 'contexts/actions';
import { useAuthContext } from 'hooks/useAuthContext';

// First and Last Name Form
export default function UpdateName({ user }) {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(255).required('First Name is required'),
    lastName: Yup.string().max(255).required('Last Name is required')
  });

  return (
    <Formik
      initialValues={{
        firstName: user.firstName || '',
        lastName: user.lastName || ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        await postData('/users/updateName', values)
          .then((response) => {
            console.log(response);
            const updatedUser = {
              ...user,
              firstName: response.firstName,
              lastName: response.lastName
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            dispatch({ type: LOGIN, payload: { user: updatedUser } });
            navigate('/dashboard/default');
          })
          .catch((error) => {
            const message = error.message || 'Something went wrong';
            setErrors({ submit: message });
            setSubmitting(false);
          });
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <OutlinedInput
                  id="firstName"
                  type="text"
                  value={values.firstName}
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  fullWidth
                  error={Boolean(touched.firstName && errors.firstName)}
                />
                {touched.firstName && errors.firstName && (
                  <FormHelperText error id="firstName-helper-text">
                    {errors.firstName}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <OutlinedInput
                  id="lastName"
                  type="text"
                  value={values.lastName}
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  fullWidth
                  error={Boolean(touched.lastName && errors.lastName)}
                />
                {touched.lastName && errors.lastName && (
                  <FormHelperText error id="lastName-helper-text">
                    {errors.lastName}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                Save Name
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

UpdateName.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  })
};
