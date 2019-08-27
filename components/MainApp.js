import React, { Component } from 'react';
import moment from 'moment';
import NoSsr from '@material-ui/core/NoSsr';
import { fetchPollutionData, fetchCitiesDesctription } from 'utils/fetchData';
import { createCitiesList, createCitiesDescriptions } from 'utils/cityLists';

import Container from '@material-ui/core/Container';
import AppHeader from './AppHeader';
import Autocomplete from './materialUI/Autocomplete';
import Accordion from './materialUI/Accordion';
import Select from './materialUI/Select';

class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultInputValue: '',
      activeCountry: '',
      citiesPollutionList: [],
      citiesDescriptions: [],
      yesterdayDate: '',
      activeParameter: 'pm25',
    };
  }

  componentDidMount() {
    this.setState({
      // getting country name from 'session storage' on component first mounting
      defaultInputValue: sessionStorage.getItem('myCountry') || '',
      // setting yesterday date
      yesterdayDate: moment()
        .subtract(1, 'days')
        .format('YYYY[-]MM[-]DD'),
    });
  }

  countryChangeHandler = country => {
    const { activeParameter, yesterdayDate } = this.state;

    // fething data based on selected country,
    // active pollution parameter and date - on country change
    this.fetchData(country, activeParameter, yesterdayDate);
    // setting selected country name as active
    this.setState({ activeCountry: country });
    // saving active country name to session storage
    sessionStorage.setItem('myCountry', country);
  };

  changeParameter = parameter => {
    this.setState({ activeParameter: parameter });
  };

  parameterChangeHandler = parameter => {
    const { activeCountry, yesterdayDate } = this.state;
    // fething data based on active country,
    // pollution parameter and date - on country change
    this.fetchData(activeCountry, parameter, yesterdayDate);
  };

  // this function returns promise so we can make asynchronous chain
  fetchData(countryName, parameter, yesterdayDate) {
    // fetching data about pollution in selected country
    return fetchPollutionData(countryName, parameter, yesterdayDate)
      .then(res => {
        // creating list of ten most polluted places (with polution count)
        // with helper function
        const citiesPollutionList = createCitiesList(res.results);
        // assigning list to state
        this.setState({ citiesPollutionList });
        // returning list for further processing
        return citiesPollutionList;
      })
      .then(cities => {
        // extracting city names from list
        const citiesToFetch = cities.map(item => item.city);
        // fetching city (places) description from Wikipedia
        fetchCitiesDesctription(citiesToFetch).then(res =>
          // extracting descriptions from response
          // and assigning ones to state
          this.setState({
            citiesDescriptions: createCitiesDescriptions(res),
          })
        );
      });
  }

  render() {
    return (
      <Container fixed>
        <AppHeader yesterdayDate={this.state.yesterdayDate} />
        {/* Input with autocomplete - cities names */}
        <NoSsr>
          <Autocomplete
            placeholder="Choose a country"
            inputLabel="Country"
            defaultInputValue={this.state.defaultInputValue}
            onChange={this.countryChangeHandler}
          />
        </NoSsr>
        {/* Selectable list with parameters - hidden until first country choosing by user */}
        {this.state.activeCountry ? (
          <Select
            {...this.state}
            changeParameter={this.changeParameter}
            parameterChangeHandler={this.parameterChangeHandler}
          />
        ) : null}
        {/* Accordion based element with information about places in selected country  */}
        <Accordion {...this.state} />
      </Container>
    );
  }
}

export default MainApp;
