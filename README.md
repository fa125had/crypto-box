# Cryptocurrency Tracking App

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Components](#components)
  - [Core Components](#core-components)
  - [Utility Components](#utility-components)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This is a React-based web application that allows users to track the latest information about first 200 cryptocurrencies sorted by market cap. The app provides real-time data, including price, market cap, and 24-hour changes.

## Features

- Real-time cryptocurrency tracking
- Search functionality
- Favorite coins
- Pagination
- Network status indicator
- Currency selector
- Error handling

## Technologies

- React
- React Router
- Local Storage
- SCSS
- React-spinners for loading indicators

## Components

### Core Components

#### `CoinsList`

- Displays a list of cryptocurrencies with pagination.

#### `FavoritesCoins`

- Shows the user's favorite cryptocurrencies.

#### `CoinRow`

- Represents a single row in the cryptocurrency list.

#### `NetworkStatus`

- Indicates the network status (online/offline).

#### `SearchBox`

- Allows users to search for cryptocurrencies.

#### `UpdateNotification`

- Displays the countdown for the next update.

#### `VsCurrencySelector`

- Allows users to select the currency for price display.

### Utility Components

#### `BackButton`

- A simple back button for navigation.

#### `CoinLogo`

- Displays the logo of a cryptocurrency.

#### `CoinName`

- Displays the name of a cryptocurrency.

#### `CoinPrice`

- Displays the current price of a cryptocurrency.

#### `CoinRank`

- Displays the market cap rank of a cryptocurrency.

#### `CoinSymbol`

- Displays the symbol of a cryptocurrency.

#### `ErrorMessage`

- Shows error messages.

## Installation

1. Clone the repository
2. Run `npm install`
3. Run `npm start`

## Usage

Visit `http://localhost:3000` to view the app.

## Dependencies

Here are the project dependencies from `package.json`:

```json
{
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@uidotdev/usehooks": "^2.3.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0",
    "react-scripts": "5.0.1",
    "react-spinners": "^0.13.8",
    "web-vitals": "^2.1.4"
  }
}
```

## Scripts

Here are the npm scripts you can run:

- `npm start`: Starts the development server.
- `npm build`: Builds the app for production.
- `npm test`: Runs tests.
- `npm eject`: Ejects the build setup.

## Contributing

Feel free to submit pull requests or create issues to improve the app.

## License

MIT License
