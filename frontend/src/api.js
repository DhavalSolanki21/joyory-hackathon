import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/documents';

/**
 * Upload & Perform Semantic Classification on PDF Document
 */
export const uploadDocument = async (file, title) => {
  const formData = new FormData();
  formData.append('file', file);
  if (title) formData.append('title', title);

  const response = await axios.post(`${API_BASE_URL}/upload/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * Confirm & Index Document into Data Directory
 */
export const confirmDocument = async (docId) => {
  const response = await axios.post(`${API_BASE_URL}/${docId}/confirm/`);
  return response.data;
};

/**
 * Query Personalized Company AI Assistant
 */
export const askCompanyAI = async (question) => {
  const response = await axios.post(`${API_BASE_URL}/chat/`, { question });
  return response.data; // { question, answer, sources }
};

/**
 * Get List of Company Documents
 */
export const fetchDocuments = async (status = null) => {
  const url = status ? `${API_BASE_URL}/?status=${status}` : `${API_BASE_URL}/`;
  const response = await axios.get(url);
  return response.data;
};

/**
 * Delete Document
 */
export const deleteDocument = async (docId) => {
  const response = await axios.delete(`${API_BASE_URL}/${docId}/`);
  return response.data;
};
