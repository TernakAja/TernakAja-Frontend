import {
  INotificationData,
  LivestockStatusCounts,
  NotificationWithLivestockFlat,
  SensorDataWithLivestock,
  SpeciesCount,
} from "@/types/dataSchema";
import { Livestock } from "@/types/schema";
import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_URL;
// const API_URL = `${API_BASE_URL}/livestock`;

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/livestock`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiResponse<T> {
  message: string;
  error?: string;
  data?: T;
}

export async function createLivestock(
  userId: number,
  farmId: number,
  deviceId: number,
  deviceType: string,
  firmware: string,
  wifiSsid: string | null,
  wifiPassword: string | null,
  name: string,
  species: string,
  breed: string,
  gender: string,
  birthDate: string,
  photoUrl: string | null,
  status: string,
  height: number,
  weight: number,
  bodyConditionScore?: number | null,
  notes?: string | null
): Promise<ApiResponse<Livestock>> {
  const data = {
    userId,
    farmId,
    deviceId,
    deviceType,
    firmware,
    wifiSsid,
    wifiPassword,
    name,
    species,
    breed,
    gender,
    birthDate,
    photoUrl,
    status,
    height,
    weight,
    bodyConditionScore:
      bodyConditionScore !== undefined ? bodyConditionScore : null,
    notes: notes !== undefined ? notes : null,
  };
  const response = await api.post("/livestock", data);
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

export const getStatusCount = async (
  userId: number
): Promise<ApiResponse<LivestockStatusCounts>> => {
  const response = await api.get(`/${userId}/status-counts`);
  return response.data;
};

export const getSpeciesCount = async (
  userId: number
): Promise<ApiResponse<SpeciesCount[]>> => {
  const response = await api.get(`/${userId}/species-counts`);
  return response.data;
};

export const getRecentNotifs = async (
  userId: number
): Promise<ApiResponse<NotificationWithLivestockFlat[]>> => {
  const response = await api.get(`/${userId}/recent-notifs`);
  return response.data;
};

export const gettAllNotifDetail = async (
  userId: number
): Promise<ApiResponse<INotificationData[]>> => {
  const response = await api.get(`/${userId}/notif-detail`);
  return response.data;
};

export const getAllLivestockByUser = async (
  userId: number
): Promise<ApiResponse<SensorDataWithLivestock[]>> => {
  const response = await api.get(`/${userId}/sensor-data`);
  return response.data;
};

export const getLivestockDetailById = async (
  livestockId: number
): Promise<ApiResponse<SensorDataWithLivestock>> => {
  const response = await api.get(`/${livestockId}/detail`);
  return response.data;
};
