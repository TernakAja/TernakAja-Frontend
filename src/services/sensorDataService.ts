import { SensorData } from "@/types/schema";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/livestock`;

export interface ApiResponse<T> {
  message: string;
  error?: string;
  sensorData?: T;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getSensorData = async (
  livestockId: number
): Promise<ApiResponse<SensorData>> => {
  try {
    const response = await api.get(`/livestock/${livestockId}/sensor-data`);
    return {
      message: response.data.message,
      sensorData: response.data.sensorData || null,
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

export const updateSensorData = async (
  livestockId: number,
  temperature: number,
  heartRate: number,
  motionLevel: number,
  timestamp?: string
): Promise<ApiResponse<SensorData>> => {
  try {
    const response = await api.put(`/livestock/${livestockId}/sensor-data`, {
      temperature,
      heartRate,
      motionLevel,
      timestamp,
    });

    return {
      message: response.data.message,
      sensorData: response.data.sensorData,
    };
  } catch (error) {
    console.error("Error updating sensor data:", error);
    return {
      message: "Failed to update sensor data",
      error: "Internal server error",
    };
  }
};

export const createSensorData = async (
  livestockId: number,
  temperature: number,
  heartRate: number,
  motionLevel: number,
  timestamp?: string
): Promise<ApiResponse<SensorData>> => {
  try {
    const response = await api.post(`/livestock/${livestockId}/sensor-data`, {
      livestockId,
      temperature,
      heartRate,
      motionLevel,
      timestamp,
    });

    return {
      message: response.data.message,
      sensorData: response.data.sensorData,
    };
  } catch (error) {
    console.error("Error creating sensor data:", error);
    return {
      message: "Failed to create sensor data",
      error: "Internal server error",
    };
  }
};

export const deleteSensorData = async (
  livestockId: number
): Promise<ApiResponse<null>> => {
  try {
    const response = await api.delete(`/livestock/${livestockId}/sensor-data`);
    return {
      message: response.data.message,
      sensorData: null,
    };
  } catch (error) {
    console.error("Error deleting sensor data:", error);
    return {
      message: "Failed to delete sensor data",
      error: "Internal server error",
    };
  }
};
