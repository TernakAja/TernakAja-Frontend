import { SensorData } from "@/types/schema";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/livestock`;

export interface ApiResponse<T> {
  message: string;
  error?: string;
  data?: T;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getLatestSensorData = async (
  livestockId: number
): Promise<ApiResponse<SensorData>> => {
  try {
    const response = await api.get(`/${livestockId}/sensor-data/latest`);
    return {
      message: response.data.message,
      data: response.data.data || null,
    };
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    return {
      message: "Failed to fetch sensor data",
      error: "Internal server error",
      //   error: error.response?.data?.error || "Internal server error",
    };
  }
};

export const getSensorDataHistory = async (
  livestockId: number
): Promise<ApiResponse<SensorData[]>> => {
  try {
    const response = await api.get(`/${livestockId}/sensor-data/history`);
    return {
      message: response.data.message,
      data: response.data.data || [],
    };
  } catch (error) {
    console.error("Error fetching sensor data history:", error);
    return {
      message: "Failed to fetch sensor data history",
      error: "Internal server error",
    };
  }
};
