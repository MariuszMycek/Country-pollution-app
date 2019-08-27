import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';

const Suggestion = props => {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem,
  } = props;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 600 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
};

Suggestion.propTypes = {
  highlightedIndex: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.number,
  ]).isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.object.isRequired,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default Suggestion;
