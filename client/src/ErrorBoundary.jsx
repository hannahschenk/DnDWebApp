import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        error: false,
    };

    // The static method belongs to the class, not instances
    // MUST return an updated state object and MUST NOT trigger side effects
    static getDerivedStateFromError(error) {
        // Returns a new state object
        return { error };
    }

    // CAN trigger side effects; commonly used to log out any errors
    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        // Print custom error message to console
        if (this.state.error) {
            console.error(this.state.error);
            return <h1>An error has occurred in a child component!</h1>;
        }

        // Return normal children if there is no error (in this case, the whole <App /> component)
        return this.props.children;
    }
}

export default ErrorBoundary;
