import { create } from 'zustand';

export const useTaskStore = create((set) => ({
    tasks: [],
    loading: false,
    error: null,
    currentFilter: 'all',
    currentCategory: 'all',
    searchQuery: '', 

    setTasks: (tasks) => set({ tasks, loading: false, error: null }),
    setFilter: (filter) => set({ currentFilter: filter }),
    setCategory: (category) => set({ currentCategory: category }),
    setSearchQuery: (query) => set({ searchQuery: query }), 
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error, loading: false })
}));