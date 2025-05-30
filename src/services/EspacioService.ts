const ESPACIO_BASE_REST_API_URL = 'http://localhost:8080/api/espacios';
import axios from 'axios';

class EspacioService {
    getAllEspacios() {
        return axios.get(ESPACIO_BASE_REST_API_URL);
    }
}

export default new EspacioService();
