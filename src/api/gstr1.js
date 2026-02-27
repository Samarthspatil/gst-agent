import apiClient from './axios';

export const gstr1API = {
  // Generate GSTR-1 draft
  generateGSTR1: async (data) => {
    const response = await apiClient.post('/api/v1/gstr1/generate', data);
    return response.data;
  },

  // Download GSTR-1 CSV
  downloadGSTR1CSV: async (url) => {
    const response = await apiClient.get(url, {
      responseType: 'blob',
    });
    return response.data;
  },
};
