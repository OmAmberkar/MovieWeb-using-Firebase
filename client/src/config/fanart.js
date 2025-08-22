import axios from "axios";

const fanartapi = import.meta.env.VITE_FANART_API_KEY
const baseURL = "https://webservice.fanart.tv/v3/movies"

export async function getFanartPoster (imdbId) {
    const res = await axios.get(`${baseURL}/${imdbId}`,{
        params : {api_key : fanartapi}
    })

    return res.data?.movieposter?.[0]?.url || null;
} 