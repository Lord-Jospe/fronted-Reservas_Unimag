import axios from "axios";

// URL base de la API
const API_URL = "http://localhost:8080/api/sedes";

// Función para obtener el token desde localStorage o donde lo guardes
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // o usa cookies si es tu caso
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const SedeService = {
  // GET /api/sedes
  getAllSedes: () => {
    return axios.get(API_URL, getAuthHeaders());
  },

  // GET /api/sedes/{id}
  getSedeById: (id: number) => {
    return axios.get(`${API_URL}/${id}`, getAuthHeaders());
  },

  // POST /api/sedes
  createSede: (data: { nombre: string }) => {
    return axios.post(API_URL, data, getAuthHeaders());
  },

  // PUT /api/sedes/{id}
  updateSede: (id: number, data: { nombre: string }) => {
    return axios.put(`${API_URL}/${id}`, data, getAuthHeaders());
  },

  // DELETE /api/sedes/{id}
  deleteSede: (id: number) => {
    return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  }
};

export default SedeService;
