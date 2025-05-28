import { LivestockSummaryItem, SensorDataWithLivestockAndAnomaly } from "@/types/livestockSchema";
import { Livestock } from "@/types/schema";
import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_URL;
// const API_URL = `${API_BASE_URL}/livestock`;

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/livestock`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export interface ApiResponse<T> {
  message: string;
  error?: string;
  livestock?: T;
}

export async function createLivestock(
  data: Livestock
): Promise<ApiResponse<Livestock>> {
  const response = await api.post("", data);
  return response.data;
}

export async function getAllLivestock(): Promise<ApiResponse<Livestock[]>> {
  const response = await api.get("");
  // console.log(response);
  return response.data;
}

export async function getLivestockById(
  id: number
): Promise<ApiResponse<Livestock>> {
  const response = await api.get(`/${id}`);
  return response.data;
}

export async function updateLivestock(
  id: number,
  data: Partial<Livestock>
): Promise<ApiResponse<Livestock>> {
  const response = await api.put(`/${id}`, data);
  return response.data;
}

export async function deleteLivestock(id: number): Promise<ApiResponse<void>> {
  const response = await api.delete(`/${id}`);
  return response.data;
}

export const getHealthSummary = async (
  userId: number
): Promise<ApiResponse<LivestockSummaryItem[]>> => {
  const response = await api.get(`/${userId}/health-summary`);
  return response.data;
};

export const getAllLivestockByUser = async (
  userId: number
): Promise<ApiResponse<SensorDataWithLivestockAndAnomaly[]>> => {
  const response = await api.get(`/${userId}/sensor-livestock-anomaly`);
  return response.data;
};