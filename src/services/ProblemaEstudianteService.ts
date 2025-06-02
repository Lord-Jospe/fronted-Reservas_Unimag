import axios from "axios";

// DTO de solicitud (para actualización)
export interface ProblemaDtoRequest {
  espacioId: number; // Opcional, si se crea un problema sin espacio
  estado: string;
  descripcion: string;
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

// Axios configurado
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

class ProblemaEstudianteService {
  getProblemasPorEstudiante(idEst: number) {
    return apiClient.get<ProblemaDtoResponse[]>(`/estudiantes/${idEst}/problemas`);
  }

  getProblemaPorId(idEst: number, id: number) {
    return apiClient.get<ProblemaDtoResponse>(`/estudiantes/${idEst}/problemas/${id}`);
  }

  getProblemasPorEstado(idEst: number, estado: string) {
    return apiClient.get<ProblemaDtoResponse[]>(`/estudiantes/${idEst}/problemas/estado`, {
      params: { estado },
    });
  }

  getProblemasPorEspacio(idEst: number, idEsp: number) {
    return apiClient.get<ProblemaDtoResponse[]>(
      `/estudiantes/${idEst}/problemas/espacio/${idEsp}`
    );
  }

  crearProblema(idEst: number, dto: ProblemaDtoRequest) {
    return apiClient.post<ProblemaDtoResponse>(`/estudiantes/${idEst}/problemas`, dto);
  }

  eliminarProblema(idEst: number, id: number) {
    return apiClient.delete(`/estudiantes/${idEst}/problemas/${id}`);
  }
}

export default new ProblemaEstudianteService();
