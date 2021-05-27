import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import consts from '../consts'
import {ConverterData, ConverterHora, ConverterMoeda} from '../Utils/Converter'
import styles from '../styles/pages/MoviePage.module.css'
import languages from '../Utils/Languages.json'
import Video from '../components/Video'

function MoviePage(){
    let {id} = useParams();
    const [movie, setMovie] = useState({})
    const [video, setVideo] = useState('')
    
    useEffect(() =>{
        fetchMovie()
        fetchVideo()
    }, [])

    async function fetchMovie(){
        const response = await fetch(consts.movie_link + id + '?language=pt-BR&' + consts.api_key);
        const arr = await response.json()
        setMovie(arr)
    }

    async function fetchVideo(){
        const response = await fetch(consts.movie_link  + id + '/videos?language=pt-BR&' + consts.api_key);
        const arr = await response.json()
        
        if(arr.results.length > 0){
            setVideo(arr.results[0].key)
        }
    }

    function renderGenre(){
        if(movie.genres){
            return movie.genres.map(i=> {
                return <li key={i.id}>{i.name}</li>
            })
        }
    }

    function movieStatus(status){
        switch(status){
            case 'Released':
                return 'Liberados'
            case 'Rumored':
                return 'Rumores'
            case 'Planned':
                return 'Planejado'
            case 'In Production':
                return 'Em Produção'
            case 'Post Production':
                return 'Pós-produção'
            case 'Canceled':
                return 'Cancelado'
            default:
                return ''
        }
    }

    return movie != {} && 
            <>
                <section className={styles.container}>
                    <header>
                        <h2>{movie.title}</h2>
                        <span>{ConverterData(movie.release_date)}</span>
                    </header>
                    <div className={styles.bodyMovie}>
                        <div>
                            <h3>Sinopse</h3>
                            <hr/>
                            <p>{movie.overview}</p>
                            <h3>Informações</h3>
                            <hr/>
                            <div className={styles.cardLine}>
                                <div className={styles.card}>
                                    <h3>Situação</h3>
                                    <p>{movieStatus(movie.status)}</p>
                                </div>
                                <div className={styles.card}>
                                    <h3>Idioma</h3>
                                    <p>{movie.original_language && languages.find(i=> i.code == movie.original_language).name}</p>
                                </div>
                                <div className={styles.card}>
                                    <h3>Duração</h3>
                                    <p>{ConverterHora(movie.runtime)}</p>
                                </div>
                                <div className={styles.card}>
                                    <h3>Orçamento</h3>
                                    <p>{ConverterMoeda(movie.budget)}</p>
                                </div>
                                <div className={styles.card}>
                                    <h3>Receita</h3>
                                    <p>{ConverterMoeda(movie.revenue)}</p>
                                </div>
                                <div className={styles.card}>
                                    <h3>Lucro</h3>
                                    <p>{ConverterMoeda(movie.revenue - movie.budget)}</p>
                                </div>
                            </div>
                            <footer>
                                <ul>
                                    {renderGenre()}
                                </ul>
                                <div className={styles.percentCircle}>
                                    <div>
                                        <p>{movie.vote_average * 10}%</p>
                                    </div>
                                </div>
                            </footer>
                        </div>
                        <img src={consts.img_link + movie.poster_path} alt={movie.title}/>
                    </div>
                </section>
                <Video videoID={video}/>
            </>
}

export default MoviePage;