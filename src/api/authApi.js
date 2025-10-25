import axiosClient from "./axiosClient";

export const authApi = {
  // Inscription
  register: (data) => axiosClient.post("/auth/register", data),

  // Connexion
  login: (data) => axiosClient.post("/auth/login", data),

  // Profil utilisateur
  profile: () => axiosClient.get("/auth/profile"),

  // Demande de réinitialisation du mot de passe
  requestPasswordReset: (data) =>
    axiosClient.post("/auth/password-reset", data),

  // Réinitialisation du mot de passe avec token
  resetPassword: (token, newPassword) =>
    axiosClient.post(`/auth/password-reset/${token}`, { newPassword }),
};
