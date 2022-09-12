import React from 'react';
import { NavLink } from 'react-router-dom';
import videogame from '../assets/videogame.png';
import './Cards.css';

const Cards = ({id, name, image, genres, createdInDb, rating}) => {
  return (
    <div className='Card'>
      <div className='Card1'>
        <NavLink className='all' to={`/videogames/${id}`}>
          <img
            className='img'
            src={/(https?:\/\/.*\.(?:png|jpg))/i.test(image) ? image : videogame }  //imagen proyecto
            alt='img not found'
            width='200px'
            height='180px'
          />
          <div className='Card3'>
            <h2>{name}</h2>
            <h3>{rating}</h3>
            <h3>Genres:</h3>
          </div>         
            {!createdInDb? (      //evalua la api
              <div className='Card4'>
                {genres?.map((e, t)=>{
                  return(
                    <div key={`${t}`}>   
                      <p>{e}</p>
                    </div>              
                  )
                })}
              </div>
               ): (         // si fue creado en DB
              <div className='Card5'>
               {genres?.map((e, t)=>{
                  return (
                    <div className='Card6' key={t}>
                      <p>{e.name}</p>
                    </div>
                  )
                })}
              </div>
            )}
        </NavLink>
      </div>
    </div>
      

  )
}

export default Cards;


