import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/layout/Layout';
import { JobProvider } from './context/JobContext';

function App() {
  return (
    <Router>
      <JobProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
      </JobProvider>
    </Router>
  );
}

export default App;