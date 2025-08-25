import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const client = axios.create({
  baseURL: API_BASE,
});

export const searchRepos = (keyword) => client.post(`/api/search?keyword=${keyword}`);
export const getResults = (keyword, page = 1, limit = 10) =>
  client.get(`/api/results?keyword=${keyword}&page=${page}&limit=${limit}`);