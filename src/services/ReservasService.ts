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

class ReservaService {
    getAllReservas() {
        return apiClient.get('/admin/reservas');
    }
    
    // Puedes añadir más métodos aquí que usarán la misma instancia configurada
}

export default new ReservaService();