import axios from 'axios';
import  consts from "../consts";

export default async function getGenre(){
    const response = await axios.get(consts.genre_link);
    return response.data
};
