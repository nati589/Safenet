import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { getData } from 'api/api';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

// ==============================|| INCOME AREA CHART ||============================== //

export default function IncomeAreaChart({ slot }) {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.error.main],
      xaxis: {
        // categories:
        //   slot === 'month'
        //     ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        //     : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: slot === 'month' ? 11 : 7
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      }
    }));
  }, [primary, secondary, line, theme, slot]);

  const [series, setSeries] = useState([
    {
      name: 'Normal',
      data: []
    },
    {
      name: 'Abnormal',
      data: []
    }
  ]);

  const getFlows = () => {
    getData('/flows')
      .then((response) => {
        // response.map((flow) => {
        //   setRows((rows) => [...rows, createData(flow._id, flow.source_ip, flow.destination_ip, flow.Attack_type, flow.timestamp.length)]);
        // });
        setSeries([
          {
            name: 'Normal',
            data: response.map((flow) => (flow.Attack_type === 'Benign' ? flow.timestamp.length : 0))
          },
          {
            name: 'Abnormal',
            data: response.reverse().map((flow) => (flow.Attack_type !== 'Benign' ? flow.timestamp.length : 0))
          }
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFlows();
    // setSeries([
    //   {
    //     name: 'Normal',
    //     data: slot === 'month' ? [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35] : [31, 40, 28, 51, 42, 109, 100]
    //   },
    //   {
    //     name: 'Abnormal',
    //     data: slot === 'month' ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41] : [11, 32, 45, 32, 34, 52, 41]
    //   }
    // ]);
  }, [slot]);

  return <ReactApexChart options={options} series={series} type="area" height={450} />;
}

IncomeAreaChart.propTypes = { slot: PropTypes.string };
