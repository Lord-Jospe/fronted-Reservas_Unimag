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
export interface ReservaDtoRequest {
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

class ReservaService {
getTodasReservas() {
    return apiClient.get<ReservaDtoResponse[]>("/admin/reservas");
  }

  getReservaPorId(idReserva: number) {
    return apiClient.get<ReservaDtoResponse>(`/admin/reservas/por-id/${idReserva}`);
  }

  getReservasPorEstudiante(idEst: number) {
    return apiClient.get<ReservaDtoResponse[]>(`/admin/reservas/por-estudiante/${idEst}`);
  }

  getReservasPorEstado(estado: string) {
    return apiClient.get<ReservaDtoResponse[]>(`/admin/reservas/por-estado`, {
      params: { estado }
    });
  }

  getReservaPorHorarioYFecha(fecha: string, idHorarioEspacio: number) {
    return apiClient.get<ReservaDtoResponse>(`/admin/reservas/por-horario-y-fecha`, {
      params: { fecha, idHorarioEspacio }
    });
  }

  crearReserva(dto: ReservaDtoRequest) {
    return apiClient.post<ReservaDtoResponse>("/admin/reservas", dto);
  }

  actualizarReserva(idReserva: number, dto: ReservaDtoRequest) {
    return apiClient.put<ReservaDtoResponse>(`/admin/reservas/${idReserva}`, dto);
  }

  cancelarReserva(idReserva: number, dto: ReservaCambioEstadoDtoRequest) {
    return apiClient.patch<ReservaDtoResponse>(`/admin/reservas/${idReserva}/cancelar`, dto);
  }

  aprobarReserva(idReserva: number) {
    return apiClient.patch<ReservaDtoResponse>(`/admin/reservas/${idReserva}/aprobar`);
  }

  rechazarReserva(idReserva: number, dto: ReservaCambioEstadoDtoRequest) {
    return apiClient.patch<ReservaDtoResponse>(`/admin/reservas/${idReserva}/rechazar`, dto);
  }
}


export default new ReservaService();