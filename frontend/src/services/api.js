import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/documents";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getDocuments = (status) => {
    const params = status ? { status } : {};
    return api.get("/", { params });
};

export const getDocument = (id) => api.get(`/${id}/`);

export const uploadDocument = (formData) => api.post("/upload/", formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const confirmDocument = (id) => api.post(`/${id}/confirm/`);

export const deleteDocument = (id) => api.delete(`/${id}/`);

export const companyChat = (question) => api.post("/chat/", { question });

export const askDocument = (id, question) => api.post(`/${id}/ask/`, { question });

export const compareDocuments = (doc1_id, doc2_id) => api.post("/compare/", { doc1_id, doc2_id });

export default api;
