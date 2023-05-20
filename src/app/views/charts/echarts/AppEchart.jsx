import { Box, styled, useTheme } from '@mui/material';
import Breadcrumb from 'app/components/Breadcrumb';
import SimpleCard from 'app/components/SimpleCard';
import LineChart from './LineChart';
import ComparisonChart2 from "./ComparisonChart2";
import SimpleExpansionPanel from "../../material-kit/expansion-panel/SimpleExpansionPanel";

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px',
  },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px',
    },
  },
}));

const AppEchart = () => {
  const theme = useTheme();
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Charts', path: '/charts' }, { name: 'Echarts' }]} />
      </Box>
        <SimpleCard title="Habit This and Last Week Activiy">
            <LineChart
                height="350px"
                color={[theme.palette.primary.main, theme.palette.primary.light]}
            />
        </SimpleCard>
      <Box sx={{ py: '12px' }} />

        <SimpleCard title="Habbit Statistics">
            <SimpleExpansionPanel/>
        </SimpleCard>


        <Box sx={{ py: '12px' }} />

      <SimpleCard title="Yearly Habit Results">
        <ComparisonChart2
          height="350px"
          color={[theme.palette.primary.dark, theme.palette.primary.light]}
        />
      </SimpleCard>
    </Container>
  );
};

export default AppEchart;
