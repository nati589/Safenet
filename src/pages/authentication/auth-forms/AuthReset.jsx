// import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import Divider from '@mui/material/Divider';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
// import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
// import { useLogin } from 'hooks/useLogin';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet';
import { postData } from 'api/api';
// import FirebaseSocial from './FirebaseSocial';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthReset() {
  // const [checked, setChecked] = React.useState(false);
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('isFirstTime'));

  const { enqueueSnackbar } = useSnackbar();
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const navigate = useNavigate();

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().max(255).required('New Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  return (
    <Formik
      initialValues={{
        newPassword: '',
        confirmPassword: ''
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setErrors, setSubmitting, resetForm }) => {
        console.log(values);
        await postData(`/auth/resetPassword/${searchParams.get('resetToken')}/${searchParams.get('isFirstTime')}`, values)
          .then((response) => {
            console.log(response);
            resetForm();
            enqueueSnackbar(response?.message, { variant: 'success' });

            // const updatedUser = {
            //   ...user,
            //   email: response.email
            // };
            // localStorage.setItem('user', JSON.stringify(updatedUser));
            // dispatch({ type: LOGIN, payload: { user: updatedUser } });
            navigate('/login');
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
          <Helmet>
            <title>Reset Password</title>
          </Helmet>
          <Grid container spacing={3} sx={{ mb: 7 }}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="newPassword">New Password</InputLabel>
                <OutlinedInput
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={values.newPassword}
                  name="newPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  fullWidth
                  error={Boolean(touched.newPassword && errors.newPassword)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle new password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showNewPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.newPassword && errors.newPassword && (
                  <FormHelperText error id="newPassword-helper-text">
                    {errors.newPassword}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  fullWidth
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <FormHelperText error id="confirmPassword-helper-text">
                    {errors.confirmPassword}
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
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
