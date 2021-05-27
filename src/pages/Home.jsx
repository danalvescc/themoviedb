import { useEffect, useState } from 'react';
import Movie from '../components/Movie';
import Header from '../components/Header';
import consts from '../consts';
import styles from '../styles/pages/Home.module.css';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    const [genres, setGenres] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1); 

    //inicial
    useEffect(() =>{
        fetchGenre()
    }, [])

    //requisições
    useEffect(()=>{
        fetchData()
    }, [inputSearch, page])

    useEffect(()=>{
        setPage(1)
    }, [inputSearch])

    async function fetchGenre(){
        const response = await fetch(consts.genre_link);
        const arr = await response.json()
        const arrComparar = arr.genres.map(i=> ({
            ...i, 
            formated: i.name.toLowerCase()
        }))
        
        setGenres(arrComparar)
    }

    async function fetchData(){
        let link= ''
        let cod = genres.find(i => i.formated === inputSearch)

        if(inputSearch.length > 0 && cod === undefined)
            link = consts.search_link  +"&query=" + inputSearch
        else if(cod != undefined)
            link = consts.discover_link + '&with_genres=' + cod.id
        else
            link = consts.discover_link
        link += "&page=" + Math.ceil(page/4)

        const response = await fetch(link);
        const arr = await response.json()

        setMovies(arr.results)
        setTotalPages(arr.total_results? ( arr.total_pages - 1 ) * 4 + Math.ceil((arr.total_results % 20)/4) : 0)
    }

    function renderMovie(){
        let length = movies.length
        if(length == 0)
            return ''
        else{
            let min = ((page - 1)% 4 ) * 5
            let max = length < min + 5? min + length : min + 5
            return movies.slice(min, max).map(i=>{
                return <Movie movie={i} genres={genres} key={i.id}/>
            })
        }
    }

    function criarArray(start, end){
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    function renderPaginate(){
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

        let arr = criarArray(min, max)        
        
        return arr.map(i=> {
            return (
                <div className={i == page? styles.percentCircle: styles.paginationItem}>
                    <div>
                        <a href="#" onClick={() => setPage(i)}>{i}</a>
                    </div>
                </div>
            )
        })
    }

    function handleOnChange(e){
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
                    onChange={
                        handleOnChange
                    }/>
                {movies.length? 
                renderMovie(): 
                <h2> Nenhum filme encontrado...</h2>}
                <div className={styles.paginate}>
                    <a href="#" className={page == 1 && "hide" } onClick={() => setPage(page - 1)}>Anterior</a>
                    {renderPaginate()}
                    <a href="#" className={page == totalPages && "hide" } onClick={() => setPage(page + 1)}>Próximo</a>
                </div>
            </section>
        </>
    )
}

export default Home;