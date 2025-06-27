import { create } from "zustand";

export const useAnimeStore = create((set) => ({
    newAnime:[],
    topAnime:[],
    upcomingAnime:[],

    setNew: (newAnime) => set({newAnime}),
    setTop: (topAnime) => set({topAnime}),
    setUpcoming: (upcomingAnime) => set({upcomingAnime}),

    fetchNewAnime: async () => {
        const res = await fetch("https://api.jikan.moe/v4/seasons/now");
        const data = await res.json();
        set({newAnime: data.data})
    },

    fetchUpcomingAnime: async () => {
        const res = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
        const data = await res.json();
        set({upcomingAnime: data.data})
    }

    }
))