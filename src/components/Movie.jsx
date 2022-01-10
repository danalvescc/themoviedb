import consts from '../consts'
import styles from '../styles/components/Movie.module.css'
import {ConverterData} from '../utils/convertValues'

function Movie(props){
    const {title,overview, poster_path, genre_ids, id, vote_average, release_date} = props.movie;
    const genres = props.genres;

    function Genre(){
        return genre_ids.map(id=> {
            let item = genres.find(g => g.id === id)
            return <li key={id}>{item&&item.name}</li>
        })
    }

    return (
        <div key={id} className={styles.container} onClick={() =>window.location.href=`/movie/${id}`}>
            {poster_path&&
                <img src={consts.img_link + poster_path} alt={title + " poster"}/>}
            <div>
                <header>
                    <div className={styles.percentCircle}>
                        <div>
                            <p>{vote_average * 10}%</p>
                        </div>
                    </div>
                    <h2>{title}</h2>
                </header>
                <div className={styles.bodyMovie}>
                    <span>{ConverterData(release_date)}</span>
                    <p>
                        {overview}
                    </p>
                    <ul>
                        <Genre/>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Movie;