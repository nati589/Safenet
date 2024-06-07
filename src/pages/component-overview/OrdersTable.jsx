// import PropTypes from 'prop-types';
// material-ui
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getData } from 'api/api';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(5)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function createData(tracking_no, name, fat, carbs, protein) {
  return { tracking_no, name, fat, carbs, protein };
}

const headCells = [
  {
    id: 'tracking_no',
    align: 'left',
    disablePadding: false,
    label: 'Flow No.'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Source IP'
  },
  {
    id: 'fat',
    align: 'right',
    disablePadding: false,
    label: 'Destination IP'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },
  {
    id: 'protein',
    align: 'right',
    disablePadding: false,
    label: 'Protocol'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={false}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 'Benign':
      color = 'success';
      title = 'Normal';
      break;
    case status:
      color = 'error';
      title = status;
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  // const [data, setData] = useState([]);

  function handleOpen(id) {
    getOneFlow(id);
    setOpen((prev) => !prev);
  }
  const [rows, setRows] = useState([]);
  const getFlows = () => {
    getData('/flows')
      .then((response) => {
        response.map((flow) => {
          // x.push({
          //   _id: flow._id,
          //   source_ip: flow.source_ip,
          //   destination_ip: flow.destination_ip,
          //   Attack_type: flow.Attack_type,
          //   size: flow.timestamp.length
          // });
          setRows((rows) => [...rows, createData(flow._id, flow.source_ip, flow.destination_ip, flow.Attack_type, flow.timestamp.length)]);
        });
        // setRows(x);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getOneFlow = (id) => {
    getData(`/flows/${id}`)
      .then((response) => {
        console.log(response);
        setModalData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // setInterval(() => {
    getFlows();
    // }, 5000);
    // getFlows();
  }, []);

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead />
          <TableBody>
            {rows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={index}>
                  <TableCell component="th" id={labelId} scope="row">
                    <Button color="secondary" onClick={() => handleOpen(row.tracking_no)}>
                      {' '}
                      {row.tracking_no}
                    </Button>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell>
                    <OrderStatus status={row.carbs} />
                  </TableCell>
                  <TableCell align="right">
                    <NumericFormat value={row.protein} displayType="text" thousandSeparator />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <BootstrapDialog onClose={() => handleOpen(null)} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Flow Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleOpen}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          {/* <CloseIcon /> */}
        </IconButton>
        <DialogContent dividers>
          <Typography variant="h4">Flow Number : {modalData?._id}</Typography>
          <Box
            sx={{
              display: 'grid',
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(3, 1fr)',
              mt: 2
            }}
          >
            <Typography variant="p">Source IP: {modalData?.source_ip}</Typography>
            <Typography variant="p">Source Port: {modalData?.source_port}</Typography>
            <Typography variant="p">Destination IP: {modalData?.destination_ip}</Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              columnGap: 3,
              rowGap: 1,
              gridTemplateColumns: 'repeat(3, 1fr)',
              mb: 2
            }}
          >
            <Typography variant="p">Destination Port: {modalData?.destination_port}</Typography>
            <Typography variant="p">Protocol: {modalData?.protocol}</Typography>
            <Typography variant="p">Attack Type: {modalData?.Attack_type}</Typography>
            <Typography variant="p">Mechanism: {modalData?.Mechanism}</Typography>
          </Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Packet List
          </Typography>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {['Timestamp', 'Packet Direction', 'Packet IHL', 'Segment', 'Flag'].map((headCell, index) => (
                  <TableCell
                    key={index}
                    // align={headCell.align}
                    padding={'normal'}
                    sortDirection={false}
                  >
                    {headCell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {modalData?.timestamp?.map((flag, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1} key={index}>
                    <TableCell component="th" id={labelId} scope="row">
                      {modalData.timestamp[index]}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {modalData.packet_dir[index]}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {modalData.packet_ihl[index]}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {modalData.packet_seg[index]}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {JSON.stringify(modalData.flags[0][index])}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleOpen(null)}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
