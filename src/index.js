import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const originalFetch = window.fetch;
window.fetch = async (...args) => {
    const [resource, config] = args;
    const path = window.location.pathname;

    let role = 'user';
    if (path.includes('/admin')) role = 'admin';
    else if (path.includes('/vendor')) role = 'vendor';

    const modifiedConfig = { ...config };
    modifiedConfig.headers = {
        ...modifiedConfig.headers,
        'x-session-role': role
    };

    return originalFetch(resource, modifiedConfig);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
