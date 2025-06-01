import axiosInstance from "./axios";

interface LoginCredentials {
  email: string;
  password: string;
  portal: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("isAuthenticated", "true");
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    // Clear all auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    localStorage.clear();

    // Only redirect if not already on auth pages
    const isAuthPage =
      window.location.pathname === "/signin" ||
      window.location.pathname === "/forgot-password";
    if (!isAuthPage) {
      window.location.replace("/signin");
    }
  },

  getCurrentUser() {
    const token = localStorage.getItem("token");
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!token || !isAuthenticated) {
      return null;
    }

    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  },
};
