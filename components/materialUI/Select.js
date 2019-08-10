import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { PARAMETERS } from 'utils/componentsData';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '30px 0 ',
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-simple">Parameter</InputLabel>
        <Select
          value={props.activeParameter}
          onChange={event => {
            props.parameterChangeHandler(event.target.value);
            props.changeParameter(event.target.value);
          }}
          inputProps={{
            name: props.activeParameter,
            id: 'select-simple',
          }}
        >
          {PARAMETERS.map(parameter => (
            <MenuItem
              key={parameter.id}
              value={parameter.id}
              title={parameter.description}
            >
              {parameter.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
}

SimpleSelect.propTypes = {
  activeParameter: PropTypes.string,
  parameterChangeHandler: PropTypes.func,
  changeParameter: PropTypes.func,
};
