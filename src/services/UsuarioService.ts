const USUARIO_BASE_REST_API_URL = 'http://localhost:8080/api/usuarios';
//const USUARIO_GET_BY_ID = '/:id';
const USUARIO_AUTHENTICATE = 'http://localhost:8080/api/auth/authentication';

import axios from 'axios';

class EspacioService {
    getAllService() {
        return axios.get(USUARIO_BASE_REST_API_URL );
    }
    
    loginUsuario(correo: string, contrasena: string) {
        return axios.post(USUARIO_AUTHENTICATE, {correo, contrasena});
    }
}

export default new EspacioService();
