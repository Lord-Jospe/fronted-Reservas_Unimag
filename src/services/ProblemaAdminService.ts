import axios from "axios";

// DTO de solicitud (para actualización)
export interface ProblemaDtoRequest {
  descripcion: string;
  estado: string;
  fecha: string;   
}

// DTO de respuesta
export interface ProblemaDtoResponse {
  idProblema: number;
  descripcion: string;
  estado: string;
  fecha: string;
  idEspacio: number;
  idEstudiante: number;
}

// Cliente Axios con autenticación
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

class ProblemaService {
  getAllProblemas() {
    return apiClient.get<ProblemaDtoResponse[]>("/problemas");
  }

  getProblemaById(id: number) {
    return apiClient.get<ProblemaDtoResponse>(`/problemas/${id}`);
  }

  getProblemasPorEstudiante(idEst: number) {
    return apiClient.get<ProblemaDtoResponse[]>(`/problemas/estudiante/${idEst}`);
  }

  getProblemasPorEstado(estado: string) {
    return apiClient.get<ProblemaDtoResponse[]>(`/problemas/estado`, {
      params: { estado },
    });
  }

  getProblemasPorEspacio(idEsp: number) {
    return apiClient.get<ProblemaDtoResponse[]>(`/problemas/espacio/${idEsp}`);
  }

  updateProblema(id: number, problema: ProblemaDtoRequest) {
    return apiClient.put<ProblemaDtoResponse>(`/problemas/${id}`, problema);
  }

  deleteProblema(id: number) {
    return apiClient.delete(`/problemas/${id}`);
  }
}

export default new ProblemaService();

