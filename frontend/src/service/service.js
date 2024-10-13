import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Replace with your API URL

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (username, password) => {
    try {
        const response = await axiosInstance.post('/login', { username, password });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || 'Login failed');
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
export const register = async (username, password) => {
    try {
        const response = await axiosInstance.post('/register', { username, password });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || 'Register failed');
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

var token = localStorage.getItem('token');
export const fetchTasks = async () => {
    try {
        const response = await axiosInstance.get('/tasks', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleted = async (id) => {
    try {
        const response = await axiosInstance.delete(`/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const submitProject = async (projectData) => {
    try {
      const response = await axiosInstance.post('/tasks', projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting project:', error);
      throw error;
    }
  };
  export const updatetask = async (id,projectData) => {
    try {
      const response = await axiosInstance.put(`/tasks/${id}`, projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting project:', error);
      throw error;
    }
  };

// Add more functions for other API calls if needed

