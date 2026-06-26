import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const verificationApi = {
  // Recognize Face
  recognize: async (photoFile) => {
    const formData = new FormData();
    formData.append('photo', photoFile);
    
    const response = await apiClient.post('/api/verification/recognize', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Register Participant (query parameters for text, form-data for photo)
  register: async (name, district, email, photoFile) => {
    const formData = new FormData();
    formData.append('photo', photoFile);

    const response = await apiClient.post('/api/verification/register', formData, {
      params: { name, district, email },
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Get Participants
  getParticipants: async () => {
    const response = await apiClient.get('/api/verification/participants');
    return response.data;
  },

  // Get Logs
  getLogs: async () => {
    const response = await apiClient.get('/api/verification/logs');
    return response.data;
  }
};

export default apiClient;