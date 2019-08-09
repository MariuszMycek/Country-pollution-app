import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    marginBottom: '30px',
  },
  dataField: {
    marginLeft: '0.4em',
  },
});

const Header = props => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <h1>Welcome!</h1>
      <h3>
        This application can show you the pollution of several european
        countries based on PM2,5 parameter from yesterday measurements
        <span className={classes.dataField}>({props.yesterdayDate})</span>
      </h3>
    </header>
  );
};

Header.propTypes = {
  yesterdayDate: PropTypes.string,
};

export default Header;
