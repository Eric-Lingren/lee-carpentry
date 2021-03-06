import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import AuthContextProvider from './context/AuthProvider'
import ProjectContextProvider from './context/ProjectProvider'
import reportWebVitals from './reportWebVitals'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ProjectContextProvider>
          <App />
        </ProjectContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();