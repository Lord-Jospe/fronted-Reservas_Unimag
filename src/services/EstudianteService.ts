import axios from "axios";

//Interfaz de solicitud para crear un estudiante
export interface EstudianteDTOCreate {
  codigoEstudiantil: number;
  nombre: string;
  idUsuario: number;
}

// Interfaz de solicitud para actualizar un estudiante
export interface EstudianteDTOUpdate {
  idEstudiante: number;
  codigoEstudiantil: number;
  nombre: string;
  idUsuario: number;
}

// Interfaz de respuesta para un estudiante
export interface EstudianteDTOResponse {
  idEstudiante: number;
  codigoEstudiantil: number;
  nombre: string;
  idUsuario: number;
}

// Configuración del cliente Axios con token
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

class EstudianteService {
  registerEstudiante(dto: EstudianteDTOCreate) {
    return apiClient.post<EstudianteDTOResponse>("/estudiantes", dto);
  }

  findEstudianteById(id: number) {
    return apiClient.get<EstudianteDTOResponse>(`/estudiantes/${id}`);
  }

  findEstudianteByCodigo(codigo: number) {
    return apiClient.get<EstudianteDTOResponse>("/estudiantes/por-correo", {
      params: { codigo },
    });
  }

  findAllEstudiantes() {
    return apiClient.get<EstudianteDTOResponse[]>("/estudiantes");
  }

  actualizarEstudiante(dto: EstudianteDTOUpdate) {
    return apiClient.put<EstudianteDTOResponse>("/estudiantes", dto);
  }

  borrarEstudiante(codigo: number) {
    return apiClient.delete<void>("/estudiantes", {
      params: { codigo },
    });
  }
}

export default new EstudianteService();
