import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

instance.interceptors.request.use((config) => {

    const token = localStorage.getItem(`${process.env.NEXT_PUBLIC_APP_NAME}-token`)

    if (token) {
        config.headers = {
            'Authorization': `Bearer ${token}`
        }
    }

    return config

})

export default instance