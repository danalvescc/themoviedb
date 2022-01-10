import axios from 'axios';
import  consts from "../consts";

export default async function getVideoMovie(id){
    const response = await axios.get(consts.movie_link  + id + '/videos?language=pt-BR&' + consts.api_key);
    return response.data
};
