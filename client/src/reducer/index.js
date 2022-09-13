import { GET_VIDEOGAMES,   // este reducer trae las accion con las que va a trabajar
         GET_GENRES, 
         GET_DETAILS, 
         CLEAR_DETAIL,
         CLEAN_VIDEOGAMES, 
         FILTER_BY_GENDER, 
         FILTER_BY_CREATED, 
         ORDER_BY_NAME, 
         GET_NAME_VIDEOGAME, 
         POST_VIDEOGAME, //jkj
         ORDER_BY_RATING,
         CLEAR_DETAIL_GENRE  } from "../actions";

//----------->>>>ESTADO QUE SE VA A SETEAR CON LAS ACTIONS<<<<-------//         
const initialState = {
      videogames : [],
      allVideogames: [],
      genres: [],
      gameDetail: []
};


//---->>>>REDUCER<<<<------//

function rootReducer (state = initialState, {type, payload}){       //tiene dos parametros   el estado   y la accion (state= initialState, action )
    switch(type){                       //  switch(action.type){}
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: payload,        //action.payload
                allVideogames: payload      //action.payload 
            }
        case GET_GENRES:
            return {
                ...state,
                genres: payload
            }
        case POST_VIDEOGAME:
            return {
                ...state
            }
        case GET_DETAILS:
            return {
                ...state,
                gameDetail: payload
            }
        case GET_NAME_VIDEOGAME:
            return {
                ...state,
                videogames: payload
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                gameDetail: []

            }
        case CLEAR_DETAIL_GENRE:
            return{
                ...state,
                genres: []
            }

        case FILTER_BY_GENDER:
            let stateGenre = state.videogames;
            let genreFiltered =
                payload === "All"
                ? stateGenre
                : stateGenre.filter((e) => {
                                            if (!e.createdInDB) {
                                                if (e.genres.some((e) => e === payload)) {  return e;  }
                                            } else if (e.createdInDB) {
                                                if (e.genres.some((e) => e.name === payload)) {
                                                        return e;
                                                    }
                                            }
                                            return false;
                                        });
             if (genreFiltered.length <= 0) {
                                            genreFiltered = stateGenre;
                                            alert("There are no videogames of the indicated genre");
                                        }return {
                                            ...state,
                                            videogames: genreFiltered,
                                        };
        case FILTER_BY_CREATED:
            let stateUno = state.allVideogames;
            let videogameCreated;
            if (payload === "Created") {
                console.log(stateUno);
                videogameCreated = stateUno.filter((e) => e.createdInDB);  //se trae del modelo

                videogameCreated.length === 0 ? alert("videogame not created") : console.log("ok found!!");
            } else if (payload === "api") {
                videogameCreated = stateUno.filter((e) => !e.createdInDB);
            } else {
                videogameCreated = stateUno;
            }return {
                ...state,
                videogames: videogameCreated 
            }; 
        case ORDER_BY_NAME:
            let stateVg = state.videogames;
            let sortedName =
            payload === "asc" 
            ? stateVg.sort((a, b) => { return a.name.toLowerCase().localeCompare(b.name.toLowerCase())})
            : stateVg.sort((a, b) => { return b.name.toLowerCase().localeCompare(a.name.toLowerCase())})
            return {
                ...state,
                videogames: sortedName,
            };

        case ORDER_BY_RATING:
            let sortedGames1 = payload === 'ratasc' ? 
            state.videogames.sort(function(a,b){
                if(a.rating > b.rating){
                    return 1;
                }
                if(b.rating > a.rating){
                    return -1;
                }
                return 0;
            }) :
            state.videogames.sort(function(a, b){
                if(a.rating > b.rating){
                    return -1;
                }
                if(b.rating > a.rating){
                    return 1
                }
                return 0;
            })
            return{
                ...state,
                videogames: sortedGames1
            }
        default:
            return state;
    }
};

export default rootReducer;