import { create } from 'zustand';

export const useResultsStore = create((set) => ({
  results: [],
  keyword: '',
  page: 1,
  totalPages: 1,
  setResults: (data) => set({ results: data }),
  setKeyword: (kw) => set({ keyword: kw }),
  setPage: (p) => set({ page: p }),
  setTotalPages: (tp) => set({ totalPages: tp }),
}));