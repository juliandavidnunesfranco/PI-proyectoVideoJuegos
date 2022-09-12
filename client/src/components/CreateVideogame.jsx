import React from 'react';
import './CreateVideogame.css';

const CreateVideogame = (props) => {
    const { history } = props;

  return (
    
        <button 
        className='button-atras'
        onClick={()=>history.goBack()}
        >atras
        </button>

    
    

  )
}
export default CreateVideogame
