import axios from 'axios';
import Constants from 'expo-constants';

function getDefaultBaseURL() {
    const debuggerHost = Constants.manifest && Constants.manifest.debuggerHost;
    const host = debuggerHost && debuggerHost.split(':')[0];

    if (host) {
        return `http://${host}:3333`;
    }

    return 'http://localhost:3333';
}

const configuredBaseURL = Constants.manifest
    && Constants.manifest.extra
    && Constants.manifest.extra.apiUrl;

const api = axios.create({
    baseURL: configuredBaseURL || getDefaultBaseURL(),
});

export default api;
