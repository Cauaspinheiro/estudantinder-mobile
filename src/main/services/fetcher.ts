import api from './api'

export default (route: string) => api.get(route).then((res) => res.data)
