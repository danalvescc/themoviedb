import axios from 'axios';
import  consts from "../consts";

export default async function getGenre(inputSearch, genreFiltered, page){
    let link;
    if(inputSearch.length > 0 && !genreFiltered)
            link = consts.search_link  +"&query=" + inputSearch
        else if(!!genreFiltered)
            link = consts.discover_link + '&with_genres=' + genreFiltered.id
        else
            link = consts.discover_link
        link += "&page=" + Math.ceil(page/4)

    const response = await axios.get(link);
    return response.data
};