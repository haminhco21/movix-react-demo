import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3/"

const headers = {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjQyZWU0OTBlYjIyYjkxMDVmMTQ5OTlhZTBjYzc5MiIsInN1YiI6IjY0ZGRjN2QzYjc3ZDRiMTEzZmM1YjZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CieHmSfmRDtCs2UPTw8OPUZR1ptD5mwVf8RgAZ8H5dI',
}

export const fetchDataFromAPI = async (url, params) => {
    try {
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        })
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}
