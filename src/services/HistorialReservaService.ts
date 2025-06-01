import axios from "axios";

// DTO de respuesta
export interface HistorialReservaDtoResponse {
  idHistorial: number;
  comentario: string;
  estadoReserva: string;
  fechaCambio: string;
  idReserva: number;
}

// Configuración base con token
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class HistorialReservaService {
  findAllHistoriales() {
    return apiClient.get<HistorialReservaDtoResponse[]>("/historiales");
  }

  findHistorialById(id: number) {
    return apiClient.get<HistorialReservaDtoResponse>(`/historiales/${id}`);
  }
}

export default new HistorialReservaService();
