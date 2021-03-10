import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/styles.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from "services/store";
import { Amplify } from 'aws-amplify';
import config from 'utils/amplify-config';
import {fetchApplications, setApplicationsFilterOptions, setCurrentApplication, submitNotes } from "./services/applications/actions"
import { fetchStartups } from 'services/startups/actions';
import { fetchRecruiters } from 'services/user/actions';

Amplify.configure({
  Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "main-app",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

store.dispatch(fetchApplications);
store.dispatch(fetchStartups);
store.dispatch(fetchRecruiters);

ReactDOM.render(
    <Provider store={store}>
        <Router>
          <App />
        </Router>
    </Provider>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
