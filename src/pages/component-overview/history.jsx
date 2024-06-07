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
import OrdersTable from './OrdersTable';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

export default function History() {
  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
}
