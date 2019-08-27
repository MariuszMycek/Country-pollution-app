import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
});

const Input = props => {
  const { InputProps, ...other } = props;

  const classes = useStyles();

  return (
    <TextField
      InputProps={{
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
};

Input.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  InputProps: PropTypes.object,
};

export default Input;
