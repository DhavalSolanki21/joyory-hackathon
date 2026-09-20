import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getDocuments = () => api.get("/doc_intelligence/");

export const getDocument = (id) => api.get(`/doc_intelligence/${id}/`);

export const uploadDocument = (formData) => api.post("/doc_intelligence/upload/", formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const deleteDocument = (id) => api.delete(`/doc_intelligence/${id}/`);

export const askDocument = (id, question) => api.post(`/doc_intelligence/${id}/ask/`, {
    question,
});

export const compareDocuments = (data) => {
    // If it's a FormData object (for files), don't set Content-Type header manually,
    // axios will handle it (multipart/form-data). If JSON, it sends application/json.
    if (data instanceof FormData) {
        return api.post("/doc_intelligence/compare/", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    return api.post("/doc_intelligence/compare/", data);
};

export default api;
