import React from 'react';
import { render } from 'react-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import constants from "./utils/constants"
import { Auth0Provider } from "@auth0/auth0-react";
render(

    <ErrorBoundary>
        <Auth0Provider
            domain="dnd-capstone.us.auth0.com"
            clientId="sIJUA9Naza1jvg7J9FuvIKDtrULMuj8T"
            redirectUri={`${constants.SELF_BASE_URL}/dashboard`}
            audience="https://dndCapstoneAuthenticate"
            scope="access:characters"
            useRefreshTokens={true}
        >
            <App/>
        </Auth0Provider>
    </ErrorBoundary>,
    document.getElementById('root')
);
