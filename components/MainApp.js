import React, { Component } from 'react';
import moment from 'moment';
import { fetchPollutionData, fetchCitiesDesctription } from 'utils/fetchData';
import { createCitiesList, createCitiesDescriptions } from 'utils/cityLists';

import Container from '@material-ui/core/Container';
import Header from './Header';
import Autocomplete from './Autocomplete';
import Accordion from './Accordion';
import Select from './Select';

class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultInputValue: '',
      country: '',
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

  onCountryChangeHandler = country => {
    const { parameter, yesterdayDate } = this.state;
    this.fetchData(country.value, parameter, yesterdayDate);
    this.setState({ country: country.value });
    sessionStorage.setItem('myCountry', country.value);
  };

  parameterChange = parameter => {
    this.setState({ parameter });
  };

  onParameterChangeHandler = parameter => {
    const { country, yesterdayDate } = this.state;
    this.fetchData(country, parameter, yesterdayDate);
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
    return (
      <Container fixed>
        <Header yesterdayDate={this.state.yesterdayDate} />
        <Autocomplete
          placeholder="Choose a country"
          defaultInputValue={this.state.defaultInputValue}
          onChange={this.onCountryChangeHandler}
        />
        {this.state.country ? (
          <Select
            {...this.state}
            parameterChange={this.parameterChange}
            onParameterChangeHandler={this.onParameterChangeHandler}
          />
        ) : null}
        <Accordion {...this.state} />
      </Container>
    );
  }
}

export default MainApp;
