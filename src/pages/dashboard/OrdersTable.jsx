import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
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
import { useEffect, useState } from 'react';
import { getData } from 'api/api';
// import { set } from 'lodash';

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
    label: 'Flow Size'
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
    case 1:
      color = 'success';
      title = 'Normal';
      break;
    case 'Benign':
      color = 'error';
      title = 'Abnormal';
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
  const [rows, setRows] = useState([]);
  const getFlows = () => {
    getData('/flows/dashboard')
      .then((response) => {
        response.map((flow) => {
          setRows((rows) => [...rows, createData(flow._id, flow.source_ip, flow.destination_ip, flow.Attack_type, flow.timestamp.length)]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFlows();
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
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.tracking_no}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    <Link color="secondary"> {row.tracking_no}</Link>
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
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

// OrderStatus.propTypes = { status: PropTypes.number };
