import fetch from 'isomorphic-unfetch';
import { getCode } from 'country-list';

const OPENAQ_API = 'https://api.openaq.org/v1/measurements';
const WIKI_API = 'https://en.wikipedia.org/w/api.php';

export function fetchPollutionData(countryName, parameter, yesterdayDate) {
  const countryCode = getCode(countryName);

  return fetch(
    `${OPENAQ_API}?country=${countryCode}&limit=10000&parameter=${parameter}&date_from=${yesterdayDate}&date_to=${yesterdayDate}`
  ).then(res => res.json());
}

export function fetchCitiesDesctription(citiesToFetch) {
  return Promise.all(
    citiesToFetch.map(city => {
      const cityName = city.replace('/', '|');
      return fetch(
        `${WIKI_API}?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${cityName}`
      ).then(res => res.json());
    })
  );
}
