//const ESPACIO_BASE_REST_API_URL = 'http://localhost:8080/api/espacios';
import axios from 'axios';

// DTO de solicitud para crear o actualizar un espacio
export interface EspacioDTOResquest {
  disponible: string;
  nombre: string;
  restricciones: string;
  tipo: string;
  idSede: number;
}
// DTO de respuesta para un espacio
export interface EspacioDTOResponse {
  id: number;
  disponible: boolean;
  nombre: string;
  restricciones: string;
  tipo: string;
  idSede: number;
}

// Crea una instancia de axios configurada
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/espacios',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir el token a cada petición
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class EspacioService {
  crearEspacio(dto: EspacioDTOResquest) {
    return apiClient.post<EspacioDTOResponse>("", dto);
  }

  listarEspacios() {
    return apiClient.get<EspacioDTOResponse[]>("");
  }

  obtenerEspacio(id: number) {
    return apiClient.get<EspacioDTOResponse>(`/${id}`);
  }

  actualizarEspacio(id: number, dto: EspacioDTOResquest) {
    return apiClient.put<EspacioDTOResponse>(`/${id}`, dto);
  }

  eliminarEspacio(id: number) {
    return apiClient.delete<void>(`/${id}`);
  }

  listarPorSede(sedeId: number) {
    return apiClient.get<EspacioDTOResponse[]>(`/sede/${sedeId}`);
  }
}

export default new EspacioService();