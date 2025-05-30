import { Farm } from "@/types/schema";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/farms`;

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

export const createFarm = async (
  farmData: Omit<Farm, "id" | "createdAt">
): Promise<ApiResponse<Farm>> => {
  try {
    const response = await api.post(`${API_URL}`, farmData);
    return response.data;
  } catch (error) {
    console.error("Error creating farm:", error);
    return { message: "Failed to create farm", error: "Internal server error" };
  }
};

export const getAllFarms = async (): Promise<ApiResponse<Farm>> => {
  try {
    const response = await api.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching farms:", error);
    return { message: "Failed to fetch farms", error: "Internal server error" };
  }
};

export const getFarmById = async (
  farmId: number
): Promise<ApiResponse<Farm>> => {
  try {
    const response = await api.get(`${API_URL}/${farmId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching farm with ID ${farmId}:`, error);
    return {
      message: `Failed to fetch farm with ID ${farmId}`,
      error: "Internal server error",
    };
  }
};

export const updateFarm = async (
  farmId: number,
  farmData: Omit<Farm, "id" | "createdAt">
): Promise<ApiResponse<Farm>> => {
  try {
    const response = await api.put(`${API_URL}/${farmId}`, farmData);
    return response.data;
  } catch (error) {
    console.error(`Error updating farm with ID ${farmId}:`, error);
    return {
      message: `Failed to update farm with ID ${farmId}`,
      error: "Internal server error",
    };
  }
};

// Delete a farm
export const deleteFarm = async (
  farmId: number
): Promise<ApiResponse<null>> => {
  try {
    const response = await api.delete(`${API_URL}/${farmId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting farm with ID ${farmId}:`, error);
    return {
      message: `Failed to delete farm with ID ${farmId}`,
      error: "Internal server error",
    };
  }
};
