import React from 'react';
import { render } from 'react-dom';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
<<<<<<< HEAD
import constants from "./utils/constants"
import { Auth0Provider } from "@auth0/auth0-react";
import "./styles/index.scss";
=======
import './styles/index.scss';
>>>>>>> a9c667983fb46d94f68a1924dfe5f6ef26944703

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
