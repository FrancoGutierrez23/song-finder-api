import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {AudioProvider} from './components/AudioContext/AudioContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <AudioProvider>
            <App/>
        </AudioProvider>
    </StrictMode>
);

