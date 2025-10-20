import axiosClient from "./axiosClient";

export const orderApi = {
  create: (data) => axiosClient.post("/orders", data),
  getByUser: () => axiosClient.get("/orders/user"),
};
