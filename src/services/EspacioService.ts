//const ESPACIO_BASE_REST_API_URL = 'http://localhost:8080/api/espacios';
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

class EspacioService {
    getAllEspacios() {
        return apiClient.get("/espacios");
    }

    getEspacioById(id: number) {
        return apiClient.get(`/espacios/${id}`);
    }
}



export default new EspacioService();
