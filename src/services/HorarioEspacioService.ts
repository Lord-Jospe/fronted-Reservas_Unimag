// services/HorarioEspacioService.ts
import axios, { AxiosResponse } from "axios";

// Interfaces
export interface HorarioEspacioDtoResponse {
  idHorarioEspacio: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
  idEspacio: number;
}

export interface HorarioEspacioDtoRequest {
  idHorarioEspacio?: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
  idEspacio: number;
}

// Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/horarios-espacios",
  headers: {
    "Content-Type": "application/json",
  },
});

// Middleware para token JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Servicio
class HorarioEspacioService {
  // GET todos los horarios
  getAllHorarios(): Promise<AxiosResponse<HorarioEspacioDtoResponse[]>> {
    return apiClient.get("/");
  }

  // GET horario por ID
  getHorarioById(id: number): Promise<AxiosResponse<HorarioEspacioDtoResponse>> {
    return apiClient.get(`/${id}`);
  }

  // GET horarios por día
  getHorariosPorDia(dia: string): Promise<AxiosResponse<HorarioEspacioDtoResponse[]>> {
    return apiClient.get("/por-dia", { params: { dia } });
  }

  // GET horarios por espacio
  getHorariosPorEspacio(idEspacio: number): Promise<AxiosResponse<HorarioEspacioDtoResponse[]>> {
    return apiClient.get(`/por-espacio/${idEspacio}`);
  }

  // GET horarios por espacio y día
  getHorariosPorEspacioYDia(dia: string, idEspacio: number): Promise<AxiosResponse<HorarioEspacioDtoResponse[]>> {
    return apiClient.get("/por-espacio-y-dia", {
      params: { dia, idEspacio },
    });
  }

  // POST crear horario
  crearHorario(dto: HorarioEspacioDtoRequest): Promise<AxiosResponse<HorarioEspacioDtoResponse>> {
    return apiClient.post("/", dto);
  }

  // PUT actualizar horario
  actualizarHorario(id: number, dto: HorarioEspacioDtoRequest): Promise<AxiosResponse<HorarioEspacioDtoResponse>> {
    return apiClient.put(`/${id}`, dto);
  }

  // DELETE borrar horario
  borrarHorario(id: number): Promise<AxiosResponse<void>> {
    return apiClient.delete(`/${id}`);
  }
}

export default new HorarioEspacioService();
