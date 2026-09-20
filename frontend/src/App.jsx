import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CompanyChatbot from './pages/CompanyChatbot';
import UploadDocument from './pages/UploadDocument';
import DocumentDirectory from './pages/DocumentDirectory';
import DocumentDetails from './pages/DocumentDetails';
import DocumentQA from './pages/DocumentQA';
import CompareDocuments from './pages/CompareDocuments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CompanyChatbot />} />
          <Route path="upload" element={<UploadDocument />} />
          <Route path="documents" element={<DocumentDirectory />} />
          <Route path="document/:id" element={<DocumentDetails />} />
          <Route path="document/:id/ask" element={<DocumentQA />} />
          <Route path="compare" element={<CompareDocuments />} />
          <Route path="*" element={<CompanyChatbot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
