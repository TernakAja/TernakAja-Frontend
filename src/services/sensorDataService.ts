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

// export const updateSensorData = async (
//   livestockId: number,
//   temperature: number,
//   heartRate: number,
//   motionLevel: number,
//   timestamp?: string
// ): Promise<ApiResponse<SensorData>> => {
//   try {
//     const response = await api.put(`/livestock/${livestockId}/sensor-data`, {
//       temperature,
//       heartRate,
//       motionLevel,
//       timestamp,
//     });

//     return {
//       message: response.data.message,
//       data: response.data.sensorData,
//     };
//   } catch (error) {
//     console.error("Error updating sensor data:", error);
//     return {
//       message: "Failed to update sensor data",
//       error: "Internal server error",
//     };
//   }
// };

export const createSensorData = async (
  livestockId: number,
  temperature: number,
  heartRate: number,
  motionLevel: number,
  timestamp?: string
): Promise<ApiResponse<SensorData>> => {
  try {
    const response = await api.post(`/${livestockId}/sensor-data`, {
      temperature,
      heartRate,
      motionLevel,
      timestamp,
    });

    return {
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    console.error("Error creating sensor data:", error);
    return {
      message: "Failed to create sensor data",
      error: "Internal server error",
    };
  }
};

// export const deleteSensorData = async (
//   livestockId: number
// ): Promise<ApiResponse<null>> => {
//   try {
//     const response = await api.delete(`/livestock/${livestockId}/sensor-data`);
//     return {
//       message: response.data.message,
//       data: null,
//     };
//   } catch (error) {
//     console.error("Error deleting sensor data:", error);
//     return {
//       message: "Failed to delete sensor data",
//       error: "Internal server error",
//     };
//   }
// };
