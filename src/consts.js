
const api_key = 'api_key=13bfa8168127433729ad42f88b150118'

export default {
    movie_link: 'https://api.themoviedb.org/3/movie/',
    genre_link: 'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&' + api_key,
    discover_link: 'https://api.themoviedb.org/3/discover/movie?language=pt-BR&' + api_key,
    search_link: 'https://api.themoviedb.org/3/search/movie?language=pt-BR&' + api_key,
    img_link: 'https://image.tmdb.org/t/p/w1280',
    api_key
}