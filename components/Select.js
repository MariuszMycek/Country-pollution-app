import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { PARAMETERS } from 'utils/constants';

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
          value={props.parameter}
          onChange={event => {
            props.onParameterChangeHandler(event.target.value);
            props.parameterChange(event.target.value);
          }}
          inputProps={{
            name: props.parameter,
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
