import type { Endpoints } from "../types/api.types";

const APIEndpoints: Endpoints = {
    GET_ALL_USERS: {
        METHOD: 'GET',
        URL: '/api/users'
    },
    GET_USER: {
        METHOD: 'GET',
        URL: '/api/users/:userID'
    },
    CREATE_USER: {
        METHOD: 'POST',
        URL: '/api/users'
    },
    ADD_POINT_TO_USER: {
        METHOD: 'POST',
        URL: '/api/users/:userID/add-points'
    }
}

export default APIEndpoints;