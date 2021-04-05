## Requirements

- Node version - v10.19.0

## Installation

Use the package manager [npm] to install the dependencies.

```bash
npm install
```

## To Run the application

```bash
npm start
```

## To Run the Tests

```bash
npm test
```

## Folder Structure

- The entry point of the application is the index.js file.
- All other files are present in the src folder.
- The config folder inside src contains configuration-related files like globals.js.
- The controllers folder contains, museumVisitorController.js. It contains the getVisitors method.
- The middleware folder contains, museumVisitorMiddleware.js. It contains the validateRequest method.
- The services folder contains, museumVisitorService.js. It contains the business logic to get the museum visitors for the given month.
- The Routes are present in the src/routes/apiRoutes.js.
- .env file contains environment related values.
- api_specs.yml file is the swagger API file.