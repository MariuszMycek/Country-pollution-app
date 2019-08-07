import React, { Component } from 'react';

import Autocomplete from '../Autocomplete';

const suggestions = [
  { label: 'Poland' },
  { label: 'Germany' },
  { label: 'Spain' },
  { label: 'France' },
];

class MainApp extends Component {
  render() {
    return (
      <div>
        <Autocomplete
          suggestions={suggestions}
          placeholder="Choose a country"
        />
      </div>
    );
  }
}

export default MainApp;
