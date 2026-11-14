import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.response?.status, error.message);

    const url = error.config?.url || "";
    const isAuthRequest = url.includes("/login") || url.includes("/register");

    if (error.response?.status === 401 && !isAuthRequest) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default {
  register: async (username, password) => {
    const result = await axios.post('/register', { username, password });
    localStorage.setItem("token", result.data.token);
  },

  login: async (username, password) => {
    const result = await axios.post('/login', { username, password });
    localStorage.setItem("token", result.data.token);
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isLoggedIn: () => {
    return !!localStorage.getItem("token");
  },

  getTasks: async () => {
    const result = await axios.get('/items');
    return result.data;
  },

  addTask: async (name) => {
    const result = await axios.post('/items', { name: name, isComplete: false });
    return result.data;
  },

  setCompleted: async (id, isComplete) => {
    const result = await axios.put(`/items/${id}`, { isComplete: isComplete });
    return result.data;
  },

  deleteTask: async (id) => {
    await axios.delete(`/items/${id}`);
  }
};