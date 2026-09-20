import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UploadDocument from './pages/UploadDocument';
import DocumentDetails from './pages/DocumentDetails';
import DocumentQA from './pages/DocumentQA';
import CompareDocuments from './pages/CompareDocuments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="upload" element={<UploadDocument />} />
          <Route path="document/:id" element={<DocumentDetails />} />
          <Route path="document/:id/ask" element={<DocumentQA />} />
          <Route path="compare" element={<CompareDocuments />} />
          <Route path="*" element={<Dashboard />} /> {/* Fallback to dashboard */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
