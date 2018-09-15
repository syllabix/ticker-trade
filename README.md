# Ticker Trade
#### A simple ok coin type exchange user interface for the web

## Overview
This project is designed to mimic an online coin exchange interface in which bids, ask prices, and trades (matches) are displayed in "realtime". It uses a simple matching algorithim to determine optimal matches based upon available buy and sell orders.

## Getting Started
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). In order to run the project you will need Node.js installed as well as the [example backend server](https://github.com/btccom/fe-exercise-backend) that generates random orders.

1. Clone this repository
2. Using your terminal/console - navigate to the root of this project and run `npm install`.
3. Start the [companion server project](https://github.com/btccom/fe-exercise-backend)
4. Start this project buy running `npm start`
5. A browser should open at localhost:3000, if not open your browser at localhost:3000.

## Testing
Tests coverage is limited, but targeted towards application critical logic. The majority of the coverage is for the primary order matching algo. The rest of the application is fairly "dumb" in the since it is driven by the state updates derived from this function.

To run the tests, navigate to the root of the project and run `npm test`.

## Technology
The project is a React/Redux app. It leverages redux router to resolve all data outside of the components.

