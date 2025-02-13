import axios, { AxiosError, AxiosResponse } from 'axios'
import { Activity } from '../models/activity.ts'
import { toast } from 'react-toastify'
import { router } from '../router/Routes.tsx'
import { store } from '../stores/store.ts'
import { User, UserFormValues } from '../models/users.ts'

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage or your MobX store
        const token = localStorage.getItem('jwt')

        // If a token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    async (response) => {
        await sleep(1000)
        return response
    },
    (error: AxiosError) => {
        const { data, status, config } = error.response as AxiosResponse
        switch (status) {
            case 400:
                if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
                    router.navigate('/not-found')
                }
                if (data.errors) {
                    const modelStateErrors = []
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key])
                        }
                    }
                    throw modelStateErrors.flat()
                } else {
                    toast.error(data)
                }
                break
            case 401:
                toast.error('Unauthorized')
                break
            case 403:
                toast.error('Forbidden request')
                break
            case 404:
                router.navigate('/not-found')
                break
            case 500:
                store.commonStore.setServerError(data)
                router.navigate('/server-error')
                break
        }
        return Promise.reject(error)
    }
)

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`/activities/${id}`),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
}

const agent = {
    Activities,
    Account,
}

export default agent
