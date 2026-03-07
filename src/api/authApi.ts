import apiClient from "@/config/apiClient";

export const sendOtp = async (phoneNumber: string) => {
  const res = await apiClient.post("/auth/send-otp", {
    phoneNumber,
  });

  return res.data;
};

export const verifyOtp = async (phoneNumber: string, otp: string) => {
  const res = await apiClient.post("/auth/verify-otp", {
    phoneNumber,
    otp,
  });

  return res.data;
};

export const getMe = async () => {
  const res = await apiClient.get("/auth/me");
  return res.data;
};