import axios from 'axios';
import  consts from "../consts";

export default async function getMovie(id){
    const response = await axios.get(consts.movie_link + id + '?language=pt-BR&' + consts.api_key);
    return response.data
};
