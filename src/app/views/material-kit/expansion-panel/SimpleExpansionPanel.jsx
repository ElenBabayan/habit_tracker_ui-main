import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {styled, useTheme} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import DoughnutChart from "../../charts/echarts/Doughnut";
import {useEffect, useState} from "react";
import axios from "../../../../axios";

const AccordionRoot = styled("div")(({ theme }) => ({
  width: "100%",
  "& .heading": {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleExpansionPanel() {
  const theme = useTheme();
  const [habits, setHabits] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get('/habits/report')
    setHabits(data);
  }, [])

  return (
    <AccordionRoot>
        {habits && habits.map((item, index) => {
            return (
                <Accordion>
                    <AccordionSummary
                        id="panel1a-header"
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                    >
                        <Typography className="heading">{item.name}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography>
                            {item.description}
                        </Typography>
                        <DoughnutChart
                            data={item}
                            height={'350px'}
                                       color={[
                                           theme.palette.error.light,
                                           theme.palette.primary.main,
                                       ]}/>
                    </AccordionDetails>
                </Accordion>
            )
        })}

    </AccordionRoot>
  );
}
