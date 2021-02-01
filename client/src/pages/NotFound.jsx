import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <main className="notFoundContainer">
            <b className="notFoundContent--title">
                404
            </b>
            <p className="notFoundContent">
                The page you are looking for is not found. Please click on one of the links above to get redirected to an existing page.
            </p>
        </main>
    );
};

export default NotFound;
