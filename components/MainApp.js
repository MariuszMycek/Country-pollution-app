import React, { Component } from 'react';
import moment from 'moment';
import { fetchPollutionData, fetchCitiesDesctription } from 'utils/fetchData';
import { createCitiesList, createCitiesDescriptions } from 'utils/cityLists';

import Header from './Header';
import Autocomplete from './Autocomplete';
import Accordion from './Accordion';

const suggestions = [
  { label: 'Poland' },
  { label: 'Germany' },
  { label: 'Spain' },
  { label: 'France' },
];

class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultInputValue: '',
      inputValue: '',
      citiesPollutionList: [],
      citiesDescriptions: [],
      yesterdayDate: '',
      parameter: 'pm25',
    };
  }

  componentDidMount() {
    this.setState({
      defaultInputValue: sessionStorage.getItem('myCountry') || '',
      yesterdayDate: moment()
        .subtract(1, 'days')
        .format('YYYY[-]MM[-]DD'),
    });
  }

  onChangeHandler = country => {
    const { parameter, yesterdayDate } = this.state;
    this.fetchData(country.value, parameter, yesterdayDate);
    this.setState({ inputValue: country.value });
    sessionStorage.setItem('myCountry', country.value);
  };
  parameterChange = parameter => {
    this.setState({ parameter });
  };

  fetchData(countryName, parameter, yesterdayDate) {
    return fetchPollutionData(countryName, parameter, yesterdayDate)
      .then(res => {
        const citiesPollutionList = createCitiesList(res.results);
        this.setState({ citiesPollutionList });
        return citiesPollutionList;
      })
      .then(cities => {
        const citiesToFetch = cities.map(item => item.city);
        fetchCitiesDesctription(citiesToFetch).then(res =>
          this.setState({
            citiesDescriptions: createCitiesDescriptions(res),
          })
        );
      });
  }

  render() {
    const {
      citiesPollutionList,
      defaultInputValue,
      yesterdayDate,
      citiesDescriptions,
      parameter,
    } = this.state;
    return (
      <div>
        <Header yesterdayDate={yesterdayDate} />
        <Autocomplete
          suggestions={suggestions}
          placeholder="Choose a country"
          defaultInputValue={defaultInputValue}
          onChange={this.onChangeHandler}
        />
        <Accordion
          citiesPollutionList={citiesPollutionList}
          citiesDescriptions={citiesDescriptions}
        />
      </div>
    );
  }
}

export default MainApp;
