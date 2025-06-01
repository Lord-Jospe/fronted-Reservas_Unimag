import axios from 'axios';

// DTO para crear o actualizar una sede
export interface SedeDTORequest {
  name: string;
}

// DTO de respuesta desde el backend
export interface SedeDTOResponse {
  id: number;
  name: string;
}

// Instancia de axios configurada
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/sedes',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class SedeService {
  crearSede(dto: SedeDTORequest) {
    return apiClient.post<SedeDTOResponse>('', dto);
  }

  listarSedes() {
    return apiClient.get<SedeDTOResponse[]>('');
  }

  getSedeById(id: number) {
    return apiClient.get<SedeDTOResponse>(`/${id}`);
  }

  actualizarSede(id: number, dto: SedeDTORequest) {
    return apiClient.put<SedeDTOResponse>(`/${id}`, dto);
  }

  eliminarSede(id: number) {
    return apiClient.delete<void>(`/${id}`);
  }
}

export default new SedeService();
