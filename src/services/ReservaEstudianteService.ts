//const RESERVAS_BASE_REST_API_URL = 'http://localhost:8080/api/admin/reservas';
import axios from 'axios';

// Crea una instancia de axios configurada
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
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


// Define las interfaces para las solicitudes y respuestas de reservas
//Interfaz de solicitud para crear una reserva
export interface ReservaEstDtoRequest {
  estado: string;
  fecha: string;
  motivo: string;
  idEstudiante: number;
  idHorarioEspacio: number;
}

// Interfaz de respuesta para una reserva
export interface ReservaDtoResponse {
  idReserva: number;
  estado: string;
  fecha: string;
  motivo: string;
  idEstudiante: number;
  idHorarioEspacio: number;
}
//Interfaz de solicitud para cambiar el estado de una reserva
export interface ReservaCambioEstadoDtoRequest {
  nuevoEstado: string; 
}

class ReservaEstudianteService {
// Obtener una reserva específica por estudiante e id de reserva
  getReservaPorId(idEst: number, idReserva: number) {
    return apiClient.get<ReservaDtoResponse>(`/estudiantes/${idEst}/reservas/${idReserva}`);
  }

  // Obtener todas las reservas de un estudiante
  getReservasPorEstudiante(idEst: number) {
    return apiClient.get<ReservaDtoResponse[]>(`/estudiantes/${idEst}/reservas`);
  }

  // Guardar una nueva reserva para un estudiante
  guardarReserva(idEst: number, reserva: ReservaEstDtoRequest) {
    return apiClient.post<ReservaEstDtoRequest>(`/estudiantes/${idEst}/reservas`, reserva);
  }

  // Actualizar una reserva existente
  actualizarReserva(idEst: number, idReserva: number, reserva: ReservaEstDtoRequest) {
    return apiClient.put<ReservaEstDtoRequest>(`/estudiantes/${idEst}/reservas/${idReserva}`, reserva);
  }

  // Cancelar una reserva (PATCH)
  cancelarReserva(idEst: number, idReserva: number, cambioEstadoDto: ReservaCambioEstadoDtoRequest) {
    return apiClient.patch<ReservaDtoResponse>(`/estudiantes/${idEst}/reservas/${idReserva}/cancelar`, cambioEstadoDto);
  }
    
}

export default new ReservaEstudianteService();