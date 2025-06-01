// services/HorarioEspacioService.ts
import axios from "axios";

interface HorarioEspacioDtoRequest {
  idHorarioEspacio?: number; // Opcional si lo autogenera el backend
  dia: string;               // Por ejemplo: "LUNES"
  horaInicio: string;        // Formato "HH:mm", ejemplo: "08:00"
  horaFin: string;           // Formato "HH:mm", ejemplo: "10:00"
  idEspacio: number;
}

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/horarios-espacios",
  headers: {
    "Content-Type": "application/json",
  },
});

// Middleware para agregar token JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

class HorarioEspacioService {
  // GET /api/horarios-espacios
  getAllHorarios() {
    return apiClient.get("/");
  }

  // GET /api/horarios-espacios/{id}
  getHorarioById(id: number) {
    return apiClient.get(`/${id}`);
  }

  // GET /api/horarios-espacios/por-dia?dia=LUNES
  getHorariosPorDia(dia: string) {
    return apiClient.get(`/por-dia`, {
      params: { dia },
    });
  }

  // GET /api/horarios-espacios/por-espacio/{id}
  getHorariosPorEspacio(idEspacio: number) {
    return apiClient.get(`/por-espacio/${idEspacio}`);
  }

  // GET /api/horarios-espacios/por-espacio-y-dia?dia=LUNES&idEspacio=1
  getHorariosPorEspacioYDia(dia: string, idEspacio: number) {
    return apiClient.get(`/por-espacio-y-dia`, {
      params: { dia, idEspacio },
    });
  }

  // POST /api/horarios-espacios
  crearHorario(dto: HorarioEspacioDtoRequest) {
    return apiClient.post("/", dto);
  }

  // PUT /api/horarios-espacios/{id}
  actualizarHorario(id: number, dto: HorarioEspacioDtoRequest) {
    return apiClient.put(`/${id}`, dto);
  }

  // DELETE /api/horarios-espacios/{id}
  borrarHorario(id: number) {
    return apiClient.delete(`/${id}`);
  }
}

export default new HorarioEspacioService();
