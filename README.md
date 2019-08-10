# Country pollution app

### Description

This example application can show you average pollution in several countries in Europe. Data is always from yesterday measurements.
You can type or select country from list. You can only display data for listed countries. After choosing the country you can display data for several different parameters which you can chose from list that will appear after country choosing. Default parameter is PM2,5.
When all data is ready you can expand list pannels to display city or region description. Descriptions comes from Wikipedia. 

The application was intended to present only polluted cities and its desctiptions but unfortunatelly for some countries there is no data for cities. It is for regions instead and it may present false image of real state.
This is probably the result of incorrect data input in those countries.

## An example deployment is running [here](https://country-pollution.mmycek83.now.sh).

### Available Scripts

In the project directory, you can run:

#### `yarn`

Installs all necessary packages to run the app.

#### `yarn dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any errors in the console.

#### `yarn build`

Builds the app for production to the `.next` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

#### `yarn start`

Starts the application in production mode.
The application should be compiled with \`next build\` first.
