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
import { useAuthContext } from 'hooks/useAuthContext';
import { LOGIN } from 'contexts/actions';
import { enqueueSnackbar } from 'notistack';

// Email Update Form
export default function UpdateEmail({ user }) {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
  });

  return (
    <Formik
      initialValues={{
        email: user.email || ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        await postData('/users/updateEmail', values)
          .then((response) => {
            console.log(response);
            const updatedUser = {
              ...user,
              email: response.email
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            dispatch({ type: LOGIN, payload: { user: updatedUser } });
            enqueueSnackbar('Email updated', { variant: 'success' });
            navigate('/dashboard/default');
          })
          .catch((error) => {
            const message = error.message || 'Something went wrong';
            // setErrors({ submit: message });
            enqueueSnackbar(message, { variant: 'error' });
            setSubmitting(false);
          });
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <OutlinedInput
                  id="email"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email && (
                  <FormHelperText error id="email-helper-text">
                    {errors.email}
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
                Save Email
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

UpdateEmail.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string
  })
};
