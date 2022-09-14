import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearVideogameDetail, getVideogameDetail } from "../actions";
import { useEffect } from "react";
import style from './Detail.module.css'
function Detail(props) {
  const dispatch = useDispatch();
  const { history, match } = props;

  useEffect(() => {
    dispatch(clearVideogameDetail(dispatch));
    dispatch(getVideogameDetail(match.params.id));
  }, [dispatch, match.params.id]);

  const idVideogame = useSelector((state) => state.gameDetail); //gameDetail

  return (
    <React.Fragment>
      <div className={style.container}>
        <button onClick={() => history.back()}>Go Back</button>

        <div className="detail">
          <img className="imagen" src={idVideogame.image} alt="img not found" />
          <p>{idVideogame.platforms}</p>
          <p>{idVideogame.genres}</p>
          <p>{idVideogame.release}</p>
          <h2>{idVideogame.name}</h2>
          <div>{idVideogame.rating}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Detail;
