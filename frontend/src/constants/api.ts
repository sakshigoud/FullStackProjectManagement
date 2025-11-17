export const API_BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    me: `${API_BASE_URL}/api/auth/me`
  },
  projects: {
    public: `${API_BASE_URL}/api/projects`,
    admin: `${API_BASE_URL}/api/admin/projects`
  },
  clients: {
    public: `${API_BASE_URL}/api/clients`,
    admin: `${API_BASE_URL}/api/admin/clients`
  },
  newsletter: {
    public: `${API_BASE_URL}/api/newsletter`,
    admin: `${API_BASE_URL}/api/admin/newsletter`
  }
} as const;
