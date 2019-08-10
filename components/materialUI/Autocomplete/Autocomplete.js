import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import { SUGGESTIONS } from 'utils/componentsData';

import Control from './Control';
import Option from './Option';
import Placeholder from './Placeholder';
import SingleValue from './SingleValue';
import ValueContainer from './ValueContainer';
import Menu from './Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minWidth: 290,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    boxShadow: '0 0 8px #000',
    transform: 'scale(1.01)',
  },
}));

const components = {
  Control,
  Menu,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const IntegrationReactSelect = props => {
  const suggestions = SUGGESTIONS.map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
  }));
  const classes = useStyles();
  const theme = useTheme();

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };
  return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          classes={classes}
          styles={selectStyles}
          inputId="react-select-single"
          TextFieldProps={{
            label: 'Country',
            InputLabelProps: {
              htmlFor: 'react-select-single',
              shrink: true,
            },
          }}
          placeholder={props.placeholder}
          options={suggestions}
          components={components}
          defaultInputValue={props.defaultInputValue}
          onChange={props.onChange}
        />
      </NoSsr>
    </div>
  );
};

IntegrationReactSelect.propTypes = {
  placeholder: PropTypes.string,
};

export default IntegrationReactSelect;
