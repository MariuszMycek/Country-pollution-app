// Function processes the measurements data
// and creates sorted list of ten most polluted places
export function createCitiesList(measurements = []) {
  const countryMeasurements = [...measurements];

  const citiesList = createCityNamesList(countryMeasurements);
  const citiesMeasurementsList = createCityMeasurementsLists(
    citiesList,
    countryMeasurements
  );
  const citiesAveragePollution = calculateAveragePollution(
    citiesMeasurementsList
  );

  return sortList(citiesAveragePollution).slice(0, 10);
}

// Function takes data of 10 cites and prepares description for each one
export function createCitiesDescriptions(citiesData) {
  return citiesData.map(
    cityData => Object.values(cityData.query.pages)[0].extract
  );
}

// Function takes measurements from entire country and returns list of cities where measuements were taken
function createCityNamesList(countryMeasurements) {
  let citiesList = [];
  countryMeasurements.forEach(measurment => {
    if (!citiesList.includes(measurment.city)) {
      citiesList.push(measurment.city);
    }
  });
  return citiesList;
}

// Function creates array with measurements for each city
function createCityMeasurementsLists(citiesList, countryMeasurements) {
  let citiesMeasurementsList = [];

  citiesList.forEach(city => {
    const cityMeasurements = countryMeasurements.filter(
      measurment => measurment.city === city
    );
    citiesMeasurementsList.push(cityMeasurements);
  });
  return citiesMeasurementsList;
}

// Function creates an array with avarage pollution for each city
function calculateAveragePollution(citiesMeasurementsList) {
  let citiesAveragePollution = [];

  citiesMeasurementsList.forEach(city => {
    const averagePollution = city
      .map(measurment => measurment.value)
      .reduce((x, y) => (x + y) / city.length);
    citiesAveragePollution.push({
      city: city[0].city,
      averagePollution: averagePollution.toFixed(2),
      unit: city[0].unit,
      parameter: city[0].parameter,
    });
  });
  return citiesAveragePollution;
}

// Function sorts list of cities - average pollution descending
function sortList(citiesAveragePollution) {
  return citiesAveragePollution.sort(
    (x, y) => y.averagePollution - x.averagePollution
  );
}
