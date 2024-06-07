// import PropTypes from 'prop-types';
// material-ui
// import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
// import ComponentWrapper from './ComponentWrapper';
import ComponentSkeleton from './ComponentSkeleton';
import OrdersTable from './OrdersTable';
// import { Tab, Tabs } from '@mui/material';
// import { useState } from 'react';

// ===============================|| COMPONENT - COLOR ||=============================== //

export default function Blacklist() {
  // const [value, setValue] = useState(0);
  // function handleChange(event, newValue) {
  //   setValue(newValue);
  // }
  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        {/* <Grid item xs={12} md={12} lg={12}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="whitelist">Whitelist</Tab>
            <Tab label="blacklist">Blacklist</Tab>
          </Tabs>
        </Grid> */}
        <Grid item xs={12} md={12} lg={12}>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
}

// ColorBox.propTypes = {
//   bgcolor: PropTypes.string,
//   title: PropTypes.string,
//   data: PropTypes.object,
//   dark: PropTypes.bool,
//   main: PropTypes.bool
// };
