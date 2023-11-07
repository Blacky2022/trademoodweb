import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { InstrumentProps } from 'store/InstrumentProvider';
import { useTheme } from 'store/ThemeContext';
import TrendingNow from 'components/trending-now';
import ActivityCompare from 'components/activity-compare';
import CustomChart from 'components/CustomChart';


// Assuming you have a service to fetch the instrument details
import { fetchInstrumentDetails } from 'services/instrumentService';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  // Add your styles here
}));

export default function InstrumentDetails() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { instrumentId } = useParams();
  const [instrument, setInstrument] = useState<InstrumentProps | null>(null);

  useEffect(() => {
    if (instrumentId) {
      fetchInstrumentDetails(instrumentId).then(setInstrument);
    }
  }, [instrumentId]);

  if (!instrument) {
    return (
      <Paper className={classes.root} style={{ backgroundColor: theme.BACKGROUND }}>
        <Typography variant="h5" color="textSecondary">
          There is no instrument data
        </Typography>
      </Paper>
    );
  }

  const formattedUpdateDate = formatLongDate(new Date(instrument.datetime * 1000));

  return (
    <Paper className={classes.root} style={{ backgroundColor: theme.BACKGROUND }}>
      <div className={classes.header}>
        <IconButton className={classes.backButton} onClick={() => history.goBack()}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4">
          Instrument Details
        </Typography>
      </div>
      <TrendingNow instrument={instrument} />
      <ActivityCompare
        title="Today's Activity vs Week's"
        activity={instrument.activityWeekly}
      />
      <ActivityCompare
        title="Today's Activity vs Yesterday's"
        activity={instrument.activityDaily}
      />
      <CustomChart instrument={instrument} />
      <Typography variant="body2" color="textSecondary">
        {`Update time: ${formattedUpdateDate}`}
      </Typography>
    </Paper>
  );
}
