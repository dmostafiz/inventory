import axios from 'axios'
import { getAccessToken, setAccessToken } from './cookieHelper';

const Axios = axios.create({
    withCredentials: 'include',
})

Axios.defaults.baseURL = process.env.BASE_API
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;


Axios.interceptors.request.use(

    req => {
        return req
    },

    err => {
        // return Promise.reject(err)
        return { data: {ok: false, msg: err?.message } }
    }

)

Axios.interceptors.response.use(

    res => {
        return res
    },

    err => {
        const status = err.response ? err.response.status : null


        if (status === 401) {
            
            // Axios.post('/auth/refresh')
            //     .then(response => {

            //         console.log('Refresh token response', response)
            //         if(response?.data?.accessToken){
            //             setAccessToken(response.data.accessToken)
            //         }

            //     })
            //     .catch(error => {

            //     })
        }

        if (status === 401) {
            // console.log('404 Error! ', res)
        }

        // return { data: { ok: false, msg: err?.message } }

    }

)

export default Axios