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
// import { Tab, Tabs } from '@mui/material';
// import { useState } from 'react';

// ===============================|| COMPONENT - COLOR ||=============================== //

export default function Blacklist() {
  // const [value, setValue] = useState(0);
  // function handleChange(event, newValue) {
  //   setValue(newValue);
  // }

  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    setBookList([
      [1,2,3,4,5,6,7],
      [1,2,3,4,5,6,7],
      [1,2,3,4,5,6,7],
      [1,2,3,4,5,6,7],
    ])
    // axios
    //   .get("/books/getBooks")
    //   .then((res) => {
    //     // console.log(res.data);
    //     setBookList(
    //       res.data.map((item) => [
    //         item.book_title,
    //         item.book_author,
    //         item.book_purchases,
    //         item.book_price,
    //         item.book_id,
    //         item.book_rating,
    //         item.book_id,
    //       ])
    //     );
    //   })
    //   .catch((error) => {
    //     // console.error(error);
    //   });
  }, []);
  const options = {
    // filterType: "checkbox",
    elevation: 0,
    selectableRows: 'none'
  };
  const StyledMUIDataTable = styled(MUIDataTable)(({ theme }) => ({
    background: theme.palette.background.default,
  }));
  const columns = [
    {
      name: "Title",
      options: {
        filter: false,
      },
    },
    {
      name: "Author",
      options: {
        filter: false,
      },
    },
    {
      name: "Purchases",
      options: {
        filter: false,
      },
    },
    {
      name: "Price",
      options: {
        filter: false,
      },
    },
    {
      name: "ID",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: "Rating",
      options: {
        display: true,
        filter: false,
      },
    },
    {
      label: "ACTION",
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
                    // console.log(data);
                    navigate(`/bookmanagement/editbook/${data}`);
                  }}
                >
                  Edit
                  {/* <EditIcon /> */}
                </Button>
              </Tooltip>
             
            </>
          );
        },
      },
      name: "update",
    },
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
          <Box>
        <StyledMUIDataTable
          title={""}
          data={bookList}
          columns={columns}
          options={options}
        />
      </Box>
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
}

