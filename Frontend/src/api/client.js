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


  register: async (name, district, email, photoFile) => {
    const formData = new FormData();
    formData.append('photo', photoFile);

    const response = await apiClient.post('/api/verification/register', formData, {
      params: { name, district, email },
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  getParticipants: async () => {
    const response = await apiClient.get('/api/verification/users');
    return response.data;
  },

  sendWhatsApp: async (endpoint, data) => {
    const response = await apiClient.post(`/api/notifications/${endpoint}`, data);
    return response.data;
  },

  deleteParticipant: async (userId) => {
    const response = await apiClient.delete(`/api/verification/user/${userId}`);
    return response.data;
  },
};

export default apiClient;