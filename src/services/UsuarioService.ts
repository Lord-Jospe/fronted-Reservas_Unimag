import axios from 'axios';

// Cliente con interceptor para token JWT
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/usuarios',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// URL para login (fuera del interceptor de usuarios)
const USUARIO_AUTHENTICATE = 'http://localhost:8080/api/auth/authentication';

export interface UsuarioDTOCreate {
  nombre: string;
  correo: string;
  contrasena: string;
  rol: string;
}

export interface UsuarioDTOResponse {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

class UsuarioService {
  getAllUsuarios() {
    return apiClient.get<UsuarioDTOResponse[]>('/');
  }

  getUsuarioById(id: number) {
    return apiClient.get<UsuarioDTOResponse>(`/${id}`);
  }

  getUsuarioByCorreo(correo: string) {
    return apiClient.get<UsuarioDTOResponse>('/por-correo', {
      params: { correo },
    });
  }

  crearUsuario(usuario: UsuarioDTOCreate) {
    return apiClient.post<UsuarioDTOResponse>('/', usuario);
  }

  actualizarUsuario(usuario: UsuarioDTOCreate) {
    return apiClient.put<UsuarioDTOResponse>('/', usuario);
  }

  eliminarUsuario(correo: string) {
    return apiClient.delete<void>('/', {
      params: { correo },
    });
  }

  loginUsuario(correo: string, contrasena: string) {
    return axios.post(USUARIO_AUTHENTICATE, { correo, contrasena });
  }
}

export default new UsuarioService();
