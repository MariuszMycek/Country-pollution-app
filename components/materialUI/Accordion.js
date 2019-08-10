import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { parameterIdToName } from 'utils/parameterIdToName';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: '50px',
  },
  content: {
    flexWrap: 'wrap',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      flexBasis: '100%',
    },
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    marginLeft: '0.4em',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: '5px',
    },
  },
  pollutionCount: {
    marginLeft: '0.4em',
    fontWeight: 600,
  },
  description: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
}));

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {props.citiesPollutionList.length ? (
        <h4>Ten most polluted places:</h4>
      ) : null}
      {props.citiesPollutionList.map((item, i) => (
        <ExpansionPanel
          key={item.city}
          expanded={expanded === `panel${i}`}
          onChange={handleChange(`panel${i}`)}
          square
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${i}bh-content`}
            id={`panel${i}bh-header`}
            classes={{ content: classes.content }}
          >
            <Typography className={classes.heading}>
              {i + 1}. {item.city}
            </Typography>
            <Typography className={classes.secondaryHeading}>
              Average {parameterIdToName(item.parameter)}:
              <span className={classes.pollutionCount}>
                {item.averagePollution} {item.unit}
              </span>
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography className={classes.description}>
              {props.citiesDescriptions[i]}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
}

ControlledExpansionPanels.propTypes = {
  citiesPollutionList: PropTypes.array,
};
