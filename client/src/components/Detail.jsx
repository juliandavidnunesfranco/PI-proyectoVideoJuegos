/* eslint-disable no-undef */
import React from 'react';
import { useDispatch, useSelector, useState } from "react-redux";
import { clearVideogameDetail, getVideogameDetail }  from "../actions";
import { useEffect } from 'react';
import videogame from '../assets/videogame.png';
import Cards from './Cards';

function Detail(props) {

    const dispatch = useDispatch();
    const { history, match } = props;
    

   useEffect(()=>{
        dispatch(clearVideogameDetail(dispatch))
        dispatch(getVideogameDetail(match.params.id));
        
    },[dispatch, match.params.id]);

    const idVideogame = useSelector((state)=> state.gameDetail);  //gameDetail
    //const id = match.params.id;
    //const detail = idVideogame.filter((e)=> e !== null);
    //const detailId = detail.filter((e)=> e.id.toString() === id.toString());
    

  return (
    <div>
      <div><p>{idVideogame.name}</p></div>


        {/* <Cards                  
                id={idVideogame.id}           
                name={idVideogame.name}
                image={idVideogame.image}
                genres={idVideogame.genres}
                createdInDB={idVideogame.createdInDB}
                rating={idVideogame.rating}
                key={idVideogame.id}
        /> */}
        
        {/* 
        {detailId?.map((e)=>{
        return(                        
            <Cards                  
                id={e.id}           
                name={e.name}
                image={e.image}
                genres={e.genres}
                createdInDB={e.createdInDB}
                rating={e.rating}
                key={e.id}
            />
        )
        })} */}
    <div>
    <button onClick={()=>history.goBack()}>Atras</button>    
    </div>
    </div>
    
  )
}

export default Detail;