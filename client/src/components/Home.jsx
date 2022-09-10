import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterGamesByGender, filterCreated, orderByName, orderByRating, getVideogames, clearVideogameDetail, clearGenreDetail } from "../actions"
import Pagination from './Pagination';
import './Home.css'
import SearchBar from './SearchBar';

const Home = () => {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    //console.log(allVideogames);  estado-->>reducer


    //-------->>>>>Paginado

    const [currentPage, setCurrentPage] = useState(1);  // estado donde cada pag una sola
    const [videogamesPerPage, setVideogamesPerPage] = useState(15); //estado cantidad de videogames por pag
    
    let ultimoGamePage = currentPage * videogamesPerPage   // 
    let primerGamePage = ultimoGamePage - videogamesPerPage //

    let currentVideoItems = allVideogames?.slice(primerGamePage, ultimoGamePage)

    let pages = [];

    const countPages = Math.ceil(allVideogames.length / videogamesPerPage);

    for (let i = 1; i < countPages.length; i++){
        pages.push(i)
    }

    const paginado = (e, page)=>{
        e.preventDefault();
        setCurrentPage(page);
    }

    /* const renderizaPag = pages.map(page =>(
        <p key={page}>
            <button 
            onClick={e =>paginado(e, page)}
            >{page}</button>
        </p>
    )) */

    //------->>>>>>Cargo los videogames con useEffect
        /* 
        useEffect(() => {
            dispatch(getVideogames());
        }, [dispatch]);
         */

    //-------->>>>Handlers

    const handleClick = (e) => {            // se declara como variable para usarla mas adelante  en el renderizado
        e.preventDefault();
        dispatch(clearVideogameDetail(dispatch));
        dispatch(getVideogames());
    };

    const handleFilterByGenre = (e) => {
        dispatch(clearGenreDetail(dispatch));
        dispatch(filterGamesByGender(e.target.value))
    };
    
    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
    };


    const [orden, setOrden] = useState('')

    const handleSortAlfabetica = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); //seteo la pagina principal
        setOrden(`Ordenado ${e.target.value}`)
    };

    const handleSortRating = (e) => {
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1); //seteo la pagina principal
        setOrden(`Ordenado ${e.target.value}`)
    };

    
    return(
        <><nav>
            <button className='button' onClick={handleClick}>Cargar videogames</button>
            <div className='cuadroUno'>
                <h3>Orden Alfabetico</h3>
                <select className="selects" onChange={e => handleSortAlfabetica(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
            </div>
            <div className='cuadroDos'>
                <h3>Ordenar Rating</h3>
                <select className="selects" onChange={e => handleSortRating(e)}>
                    <option value='ratasc'>Ascendente</option>
                    <option value='ratdesc'>Descendente</option>
                </select>
            </div>
            <div className='cuadroTres'>
                <h3>Ordenar Generos</h3>
                <select className="selects" onChange={e => handleFilterByGenre(e)}>
                    <option value='All'>All Genres</option>
                    <option value='Action'>Action</option>
                    <option value='RPG'>RPG</option>
                    <option value='Adventure'>Adventure</option>
                    <option value='Indie'>Indie</option>
                    <option value='Strategy'>Strategy</option>
                    <option value='Shooter'>Shooter</option>
                    <option value='Casual'>Casual</option>
                    <option value='Simulation'>Simulation</option>
                    <option value='Puzzle'>Puzzle</option>
                    <option value='Arcade'>Arcade</option>
                    <option value='Platformer'>Platformer</option>
                    <option value='Racing'>Racing</option>
                    <option value='Multiplayer'>Massively Multiplayer</option>
                    <option value='Sports'>Sports</option>
                    <option value='Fighting'>Fighting</option>
                    <option value='Family'>Family</option>
                    <option value='Board'>Board Games</option>
                    <option value='Educational'>Educational</option>
                    <option value='Card'>Card</option>
                </select>
            </div>
            <div className='cuadroCuatro'>
                <h3>Seleccionar X</h3>
                <select className="selects" onChange={e => handleFilterCreated(e)}>
                    <option value='All'>Todos</option>
                    <option value='api'>From API</option>
                    <option value='Created'>From DB</option>
                </select>
            </div>
            <div>
                <Pagination
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    pagination={paginado} />
            </div>
        </nav>
        <div>
            <SearchBar />
        </div></>

    )  
};

export default Home;