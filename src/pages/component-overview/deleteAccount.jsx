import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LOGOUT } from 'contexts/actions';
import { postData } from 'api/api';
import { useAuthContext } from 'hooks/useAuthContext';
// import { postData } from 'api/api';

// Account Deletion Component with Confirmation
export default function DeleteAccount() {
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAccount = async () => {
    await postData('/users/delete', {})
      .then((response) => {
        console.log(response);
        // resetForm();

        // const updatedUser = {
        //   ...user,
        //   email: response.email
        // };
        localStorage.removeItem('user');
        dispatch({ type: LOGOUT, payload: { user: null } });
        // navigate('/login');
      })
      .catch((error) => {
        const message = error.message || 'Something went wrong';
        setErrors({ submit: message });
        setSubmitting(false);
      });
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" color="error">
            Deleting your account is permanent and cannot be undone.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="error" fullWidth onClick={handleClickOpen}>
            Delete Account
          </Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Confirm Account Deletion'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your account? This action is permanent and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
