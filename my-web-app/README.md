# Contents

- Overview
- Run the app locally
- Documentation

# Overview

## The application contains the following pages:

- Dashboard (/dashboard)
- User List (/users)
- Add User (/users/add)
- Edit User (/users/:id/edit)
- User's Details (/users/:id/detail)

# Run the App Locally

- Install `Node.js` and `npm` from `https://nodejs.org`.

- Download or clone the project source code from `_repo link_`

- Install all required npm packages by running `npm install` from the command line in the project root folder (where the `package.json` is located).

- Start the application by running npm start from the command line in the project root folder.

The browser should automatically launch the application at `http://localhost:3000`

# Documentation

## The project source (/src) is organized into the following main folders:

- **\_helpers**: Anything that doesn't fit into the other folders and doesn't justify having its own folder.
- **\_redux**: Redux store and slices that define the global state available to the application. Each slice contains actions and reducers that are responsible for updating global state. For more info on Redux see https://redux.js.org.
- **components**:
  - **common**: Components used by pages or by others component
  - **dashboard**: Dashboard pages components
  - **errors**: Errors pages components
  - **user**: User pages components
- **router**: define routes and main layout for the application

## Folder naming convention

Each feature has its own folder (e.g. users, dashboard,.. ), other shared/common code such as helpers, store etc are placed in folders prefixed with an underscore \_ to easily differentiate them from features and to group them together at the top of the folder structure.

## Barrel files

The index.tsx file in each folder are barrel files that re-export all of the modules from that folder so they can be imported using only the folder path instead of the full path to each module, and to enable importing multiple modules in a single import (e.g. import { X, Y } from 'components';).

## Base URL for imports

The baseUrl is set to "src" in the jsconfig.json file to make all import statements (without a dot '.' prefix) relative to the /src folder of the project, removing the need for long relative paths like import { Component } from '../../../components';.

### Redux Slice

Path: /src/\_redux/xxx.slice.tsx

The `xxx` slice manages Redux state, actions and reducers for `xxx management` in the app. Each part of the slice is organized into its own function that is called from the top of the file to make it easier to see what's going on. initialState defines the state properties in this slice with their initial values. The list property is for storing all items fetched from the API and item is for storing a single item. They both default to null but can hold the following values:

- list
  - null - initial state.
  - { loading: true } - item list currently being fetched from the API.
  - { value: [{...}, {...}] } - array of items returned by the API.
  - { error: { message: 'an error message' } } - request to the API failed and an error was returned.
- item
  - null - initial state.
  - { loading: true } - single item is currently being fetched from the API.
  - { value: {...} } - item object returned by the API.
  - { error: { message: 'an error message' } } - request to the API failed and an error was returned.

Async Actions with createAsyncThunk()

The extraActions object contains logic for asynchronous actions (things you have to wait for) such as API requests. Async actions are created with the Redux Toolkit createAsyncThunk() function. The extraReducers object contains methods for updating Redux state at different stages of async actions (pending, fulfilled, rejected), and is passed as a parameter to the createSlice() function.

Export Actions and Reducer for Redux Slice
The `xxxActions` export includes all sync actions (slice.actions) and async actions (extraActions) for the `xxx` slice.

The reducer for the `xxx` slice is exported as `xxxReducer`, which is used in the root Redux store to configure global state for the app.

### Redux Store

Path: /src/\_redux/store.tsx

The store file configures the root Redux store for the application with the configureStore() function. The returned Redux store contains the state properties alert, auth and users which map to their corresponding slices.

The index file also re-exports all of the modules from the Redux slices in the folder. This enables Redux modules to be imported directly from the \_store folder without the path to the slice file. It also enables multiple imports from different files at once (e.g. import { store, authActions } from '\_store';)

### Root Component

Path: /src/router/RootLayout.tsx

The RootLayout component renders child routes with the <Outlet /> component and also act as main layout.

### Router.tsx file

Path: /src/router/router.tsx

The router.tsx file define main routes for the application.

The last route { errorElement: <ErrorPage /> }, is a catch that redirects any unmatched paths to the error page.

### Main index.tsx file

Path: /src/index.tsx

The main index.tsx file bootstraps the app by rendering the App component in the root div element located in the main index html file.

The Provider component is the context provider for Redux state and is a required ancestor for any React components that access Redux state. Wrapping it around the root App component makes the Redux store global so it's accessible to all components in the app.

The React.StrictMode component doesn't render any elements in the UI, it runs in development mode to highlight potential issues/bugs in the app. For more info see https://reactjs.org/docs/strict-mode.html.

Before the React app is started, the global CSS stylesheet (./index.css) is imported.

### Dotenv

Path: /.env

The dotenv file contains environment variables used in the app,

Environment variables set in the dotenv file that are prefixed with REACT_APP\_ are accessible in the React app via process.env.<variable name> (e.g. process.env.REACT_APP_API_URL). For more info on using environment variables in React see React - Access Environment Variables from dotenv (.env)

### jsconfig.json

Path: /jsconfig.json

For more info on absolute imports in React see https://create-react-app.dev/docs/importing-a-component/#absolute-imports.

### Package.json

Path: /package.json

The package.json file contains project configuration information including package dependencies that get installed when you run npm install and scripts that are executed when you run npm start or npm run build etc.

Full documentation on package.json is available at https://docs.npmjs.com/files/package.json.
