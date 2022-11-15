import axios from "axios";
import { storeGetToken } from "../Auth/tokenService";

const baseUrl = 'http://localhost:4000';

export const fetchUrl = (url) => {
    return new Promise((res, rej) => {
        const config = {
            headers: {
                authorization: storeGetToken()
            },
            withCredentials: true
        }

        axios.get(`${baseUrl}${url}`, config).then(resp => {
            res(resp.data.data);
        }).catch((resp) => {
            rej(resp.response.data);
        })
    })
};

export const fetchUrlPut = async(url, data) => {
    return new Promise((res, rej) => {
        axios.put(`${baseUrl}${url}`, data, {headers: {
            authorization: storeGetToken()
        },withCredentials: true},).then(resp => {
            res(resp);
        }).catch((resp) => {
            rej(resp.response.data)
        })
    })
};

export const fetchUrlPost = async(url, data) => {
    return new Promise((res, rej) => {
        axios.post(`${baseUrl}${url}`, data, {headers: {
            authorization: storeGetToken()
        },withCredentials: true},).then(resp => {
            res(resp);
        }).catch((resp) => {
            rej(resp.response.data)
        })
    })
};