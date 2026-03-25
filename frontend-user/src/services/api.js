const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fonction utilitaire pour gérer les requêtes fetch
 */
const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }

      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============================== AUTH ENDPOINTS ==============================
export const authAPI = {
  register: async (userData) => {
    return await fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  login: async (credentials) => {
    return await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },
  getMe: async () => {
    return await fetchAPI('/auth/me');
  },
  updateProfile: async (updates) => {
    return await fetchAPI('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },
  changePassword: async (passwords) => {
    return await fetchAPI('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwords)
    });
  },
  logout: async () => {
    return await fetchAPI('/auth/logout', { method: 'POST' });
  }
};

// ============================== MOVIES ENDPOINTS ==============================
export const moviesAPI = {
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value);
      }
    });
    const queryString = queryParams.toString();
    const endpoint = queryString ? `/movies?${queryString}` : '/movies';
    return await fetchAPI(endpoint);
  },
  getById: async (id) => {
    return await fetchAPI(`/movies/${id}`);
  },
  getSimilar: async (id) => {
    return await fetchAPI(`/movies/${id}/similar`);
  },
  create: async (movieData) => {
    return await fetchAPI('/movies', {
      method: 'POST',
      body: JSON.stringify(movieData)
    });
  },
  update: async (id, updates) => {
    return await fetchAPI(`/movies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },
  delete: async (id) => {
    return await fetchAPI(`/movies/${id}`, { method: 'DELETE' });
  },
  getStats: async () => {
    return await fetchAPI('/movies/stats');
  },
  search: async (filters) => {
    return this.getAll(filters); // Réutilise la logique de getAll
  }
};

// ============================== RENTALS ENDPOINTS ==============================
export const rentalsAPI = {
  rent: async (movieId) => {
    return await fetchAPI('/rentals', {
      method: 'POST',
      body: JSON.stringify({ movie: movieId })
    });
  },
  getMyRentals: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return await fetchAPI(`/rentals/my-rentals${queryParams ? '?' + queryParams : ''}`);
  },
  getAll: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return await fetchAPI(`/rentals${queryParams ? '?' + queryParams : ''}`);
  },
  cancel: async (id) => {
    return await fetchAPI(`/rentals/${id}`, { method: 'DELETE' });
  },
  getStats: async () => {
    return await fetchAPI('/rentals/stats');
  }
};

// ============================== HELPER FUNCTIONS ==============================
export const isAuthenticated = () => !!localStorage.getItem('token');

export const getToken = () => localStorage.getItem('token');

export const saveAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export default {
  authAPI,
  moviesAPI,
  rentalsAPI,
  isAuthenticated,
  getToken,
  saveAuth,
  clearAuth,
  getUser
};