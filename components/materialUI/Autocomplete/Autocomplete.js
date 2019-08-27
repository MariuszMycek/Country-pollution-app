import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import Paper from '@material-ui/core/Paper';
import { SUGGESTIONS } from 'utils/componentsData';
import Suggestion from './Suggestion';
import NoOptions from './NoOptions';
import Input from './Input';

function getSuggestions(value, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : // Checking if any suggestions contains input value and returning array with matching ones.
      SUGGESTIONS.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.toLowerCase().includes(inputValue);

        if (keep) {
          count += 1;
        }
        return keep;
      });
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.8)',
    transform: 'scale(1.01)',
  },
}));

const Autocomplete = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* Rendering Downshift component */}
      <Downshift
        id="downshift-options"
        // First option in menu is always highlighted by default
        defaultHighlightedIndex={0}
        // Initial input value from local/session storage
        initialInputValue={props.defaultInputValue}
        // Passing selected value
        onChange={selectedItem => props.onChange(selectedItem)}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          openMenu,
          selectedItem,
        }) => {
          const { onBlur, onFocus, ...inputProps } = getInputProps({
            onFocus: openMenu,
            placeholder: props.placeholder,
          });

          // Array with suggestions available for current input value
          const suggestions = getSuggestions(inputValue, { showEmpty: true });

          return (
            <div className={classes.container}>
              <Input
                fullWidth
                label={props.inputLabel}
                InputLabelProps={getLabelProps({ shrink: true })}
                InputProps={{ onBlur, onFocus }}
                inputProps={inputProps}
              />
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {/* If there are any suggestions available they are displayed.
                    If not - proper info is displayed */}
                    {suggestions.length ? (
                      suggestions.map((suggestion, index) => (
                        <Suggestion
                          key={suggestion.label}
                          suggestion={suggestion}
                          index={index}
                          itemProps={getItemProps({
                            item: suggestion.label,
                          })}
                          highlightedIndex={highlightedIndex}
                          selectedItem={selectedItem}
                        />
                      ))
                    ) : (
                      <NoOptions />
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
};

Autocomplete.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultInputValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
};

export default Autocomplete;
