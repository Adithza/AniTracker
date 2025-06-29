import { create } from "zustand";

export const useAnimeStore = create((set) => ({
    newAnime:[],
    topAnime:[],
    upcomingAnime:[],

    setNew: (newAnime) => set({newAnime}),
    setTop: (topAnime) => set({topAnime}),
    setUpcoming: (upcomingAnime) => set({upcomingAnime}),


    fetchData: async (type) => {

        let target;
        let cachekey;

        switch(type) {
            case "upcoming":
                target = "https://api.jikan.moe/v4/seasons/upcoming";
                cachekey = "upcomingAnime";
                break;
            case "new":
                target = "https://api.jikan.moe/v4/seasons/now";
                cachekey = "newAnime";
                break;
            case "top":
                target = "https://api.jikan.moe/v4/top/anime";
                cachekey = "topAnime";
                break;
        }

        const cachedData = localStorage.getItem(cachekey);
        if (cachedData) {
            set({ [cachekey]: JSON.parse(cachedData) });
            return;
        }
        try {
            const res = await fetch(target);
            if (res.status === 429) {
               console.error("Rate limit exceeded for fetchUpcomingAnime");
                return;
            }
            const data = await res.json();
            localStorage.setItem(cachekey, JSON.stringify(data.data));
            set({ [cachekey]: data.data });
        } catch (error) {
        console.error("Error fetching upcoming anime:", error);
        }
    }

    }
))