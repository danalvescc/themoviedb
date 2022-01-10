import { useEffect, useState } from 'react';
import Movie from '../components/Movie';
import styles from '../styles/pages/Home.module.css';
import getGenre from '../services/getGenre';
import getMovies from '../services/getMovies';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [genres, setGenres] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1); 

    useEffect(() =>{
        const request = async () => {
            const response = await getGenre();
            setGenres(response.genres.map(i=> ({
                ...i, 
                formated: i.name.toLowerCase()
            })))
        }
        request();
    }, [])

    useEffect(()=>{
        const request = async () => {
            let genreFiltered = genres.find(i => i.formated === inputSearch)
            var response = await getMovies(inputSearch, genreFiltered, page)

            setMovies(response.results)
            setTotalPages(response.total_results? ( response.total_pages - 1 ) * 4 + Math.ceil((response.total_results % 20)/4) : 0)
        }
        request();
    }, [inputSearch, page])

    useEffect(()=>{
        setPage(1)
    }, [inputSearch])

    function Movies(){
        let length = movies.length
        if(length === 0)
            return ''
        else{
            let min = ((page - 1)% 4 ) * 5
            let max = length < min + 5? min + length : min + 5
            return movies.slice(min, max).map(i=>{
                return <Movie movie={i} genres={genres} key={i.id}/>
            })
        }
    }

    function createArray(start, end){
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    function Paginate(){
        let max, min = 0;

        if(page < 3)
            min = 1
        else if(page >= totalPages - 2)
            min = totalPages - 4
        else
            min = page - 2;
        if(page > totalPages - 2)
            max = totalPages
        else if(page <= 3)
            max = 5
        else
            max = page + 2

        let arr = createArray(min, max)        
        
        return arr.map(i=> {
            return (
                <div className={i === page? styles.percentCircle: styles.paginationItem}>
                    <div>
                        <a href="#" onClick={() => setPage(i)}>{i}</a>
                    </div>
                </div>
            )
        })
    }

    function handleChange(e){
        setInputSearch(e.target.value)
    }
      
    return (
        <>
            <section className={styles.container}>
                <input 
                    type="text" 
                    id="filmName"
                    className="inputSearch"
                    placeholder="Busque um filme por nome, ano ou gênero..."
                    onChange={handleChange}/>
                {movies.length? 
                <Movies/>   : 
                <h2> Nenhum filme encontrado...</h2>}
                <div className={styles.paginate}>
                    <a href="#" className={page === 1 && "hide" } onClick={() => setPage(page - 1)}>Anterior</a>
                        <Paginate/>
                    <a href="#" className={page === totalPages && "hide" } onClick={() => setPage(page + 1)}>Próximo</a>
                </div>
            </section>
        </>
    )
}

export default Home;