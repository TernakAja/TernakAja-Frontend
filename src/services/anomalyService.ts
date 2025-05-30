import { Anomaly } from "@/types/schema";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/livestock`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export interface ApiResponse<T> {
  message: string;
  error?: string;
  data?: T;
}

export const getAnomaliesData = async (
  livestockId: number
): Promise<ApiResponse<Anomaly>> => {
  try {
    const response = await api.get<ApiResponse<Anomaly>>(
      `${API_URL}/anomalies/${livestockId}`
    );
    return response.data;
  } catch (error) {
    return {
      message: "Failed to retrieve anomalies data",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const updateAnomaliesData = async (
  livestockId: number,
  anomalyData: Anomaly
): Promise<ApiResponse<Anomaly>> => {
  try {
    const response = await api.put<ApiResponse<Anomaly>>(
      `${API_URL}/anomalies/${livestockId}`,
      anomalyData
    );
    return response.data;
  } catch (error) {
    return {
      message: "Failed to update anomaly data",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const createAnomaly = async (
  anomalyData: Omit<Anomaly, "livestockId">
): Promise<ApiResponse<Anomaly>> => {
  try {
    const response = await api.post<ApiResponse<Anomaly>>(
      `${API_URL}/anomalies`,
      anomalyData
    );
    return response.data;
  } catch (error) {
    return {
      message: "Failed to create anomaly",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const deleteAnomaly = async (
  livestockId: number
): Promise<ApiResponse<null>> => {
  try {
    const response = await api.delete<ApiResponse<null>>(
      `${API_URL}/anomalies/${livestockId}`
    );
    return response.data;
  } catch (error) {
    return {
      message: "Failed to delete anomaly",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
