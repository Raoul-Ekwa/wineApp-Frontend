// src/api/userApi.js
import axiosClient from "./axiosClient";

// Récupérer le profil de l'utilisateur
export const getUserProfile = async () => {
  try {
    const response = await axiosClient.get("/users/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Mettre à jour le profil utilisateur
export const updateUserProfile = async (userData) => {
  try {
    const response = await axiosClient.put("/users/profile", userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Login
export const loginUser = async (credentials) => {
  try {
    const response = await axiosClient.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Register
export const registerUser = async (userData) => {
  try {
    const response = await axiosClient.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};
