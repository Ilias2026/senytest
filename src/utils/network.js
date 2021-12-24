import axios from "axios";

const instance = axios.create({
    withCredentials: true,
})

//we wrap axios request in a function so we can use it in other files where we have the data directly without response
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