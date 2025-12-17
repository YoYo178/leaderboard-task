import axios from 'axios';

import { BACKEND_URL } from '../config/backendConfig';

const isProduction = import.meta.env.PROD;

export const API = axios.create({
    baseURL: BACKEND_URL + `${isProduction ? '/leaderboard-task' : ''}`,
});