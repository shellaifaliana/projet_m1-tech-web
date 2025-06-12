import api from "../data/api"


class ApiService {
    static async getAll(url) {
        const response = await api.get(url)
        return response
    }

    static async post(url, body) {
        const response = await api.post(url, body)
        return response
    }

    static async put(url, body){
        const response = await api.put(url, body)
        return response
    }

    static async delete(url) {
        const response = await api.delete(url)
        return response
    }
}

export default ApiService