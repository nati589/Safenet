// material-ui
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';
import UpdateName from './updateName';
import { useAuthContext } from 'hooks/useAuthContext';
import UpdateEmail from './updateEmail';
import UpdatePassword from './updatePassword';
import DeleteAccount from './deleteAccount';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

export default function Profile() {
    const { state } = useAuthContext();
  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <MainCard sx={{ mt: 2, p: 2 }} content={false}>
            <UpdateName user={state.user} />
            <UpdateEmail user={state.user} />
            <UpdatePassword />
            <DeleteAccount userId={state.user._id} />
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
}
