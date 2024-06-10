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
// import OrdersTable from './OrdersTable';
import { Box, Button, Tooltip } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { getData, postData } from 'api/api';
import { useNavigate } from 'react-router';
import { enqueueSnackbar } from 'notistack';
// import { Tab, Tabs } from '@mui/material';
// import { useState } from 'react';

// ===============================|| COMPONENT - COLOR ||=============================== //

export default function UserList() {
  // const [value, setValue] = useState(0);
  // function handleChange(event, newValue) {
  //   setValue(newValue);
  // }
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);
  const fetchUsers = async () => {
    getData('/users/admin')
      .then((res) => {
        console.log(res);
        // setBlackList(res);
        setUserList(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleToggle = async (id) => {
    postData(`/users/toggleUser/${id}`, {})
      .then((response) => {
        enqueueSnackbar(response?.message, { variant: 'success' });
        console.log('User Toggled');
        fetchUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const options = {
    // filterType: "checkbox",
    elevation: 0,
    selectableRows: 'none'
  };
  const StyledMUIDataTable = styled(MUIDataTable)(({ theme }) => ({
    background: theme.palette.background.default
  }));
  const columns = [
    {
      name: 'Name',
      options: {
        filter: false,
        sort: true
      }
    },
    {
      name: 'Email',
      options: {
        filter: false
      }
    },
    {
      name: 'Role',
      options: {
        filter: false
      }
    },
    {
      name: 'Status',
      options: {
        filter: false
      }
    },
    // {
    //   name: 'ID',
    //   options: {
    //     display: false,
    //     filter: false,
    //     sort: false
    //   }
    // },
    {
      label: 'ACTION',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          let data = value;
          return (
            <>
              <Tooltip title="Edit">
                <Button
                  onClick={() => {
                    console.log(data);
                    handleToggle(data);
                    // navigate(`/user/${data}`);
                  }}
                >
                  Change Status
                  {/* <EditIcon /> */}
                </Button>
              </Tooltip>
            </>
          );
        }
      },
      name: 'update'
    }
  ];
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
            <Box sx={{ display: 'flex', justifyContent: 'end', my: 2, mx: 2 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate('/userlist/adduser');
                }}
              >
                Add User
              </Button>
            </Box>
            <Box>
              <StyledMUIDataTable title={''} data={userList} columns={columns} options={options} />
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
}
