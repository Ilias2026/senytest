import axios from "axios";

const instance = axios.create({
    withCredentials: true,
})

export const post = (url, data = {}, config = {}) => {
    return new Promise((resolve, reject) => {
        instance.post(url, data, {
            ...config,
        }).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}

const network = {
    post,
}

export default network;