import {GET_ALL_VIDEOGAMES,
    FIND_VIDEOGAMES,
    VIDEOGAME_DETAIL,
    GET_GENRES,
    FILTER_BY_GENRE,
    FILTER_BY_ORIGIN,
    ORDER_BY_NAME,
    ORDER_BY_RATING} from './action_type';

import axios from "axios";

const apiUrl = "http://localhost:3001";




export const getAllVideogames = () => {
    return async function (dispatch) {
      await axios.get(`${apiUrl}/videogames`).then((response)=>{
        dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: response.data
        })
        console.log(response.data);//todos los videojuegos
      }) 
    };
  };

export const findVideogames=(payload) =>{
    return async function(dispatch){
        try { 
            const json= await axios.get(`${apiUrl}/videogames?name=${payload}`)
            const data= json.data;
           
            return dispatch({
                type: FIND_VIDEOGAMES,
                payload:data,
            });
            
        } catch (error) {
               
        }
    }  
};
export const videogamesDetail=(id) =>{
    return async function(dispatch){
        const json= await axios.get(`${apiUrl}/videogames/${id}`)
            let data= json.data;
            if(Array.isArray(data)){
                data = data[0]
            }
            console.log(data)
        return dispatch({
            type: VIDEOGAME_DETAIL,
            payload:data,
        });
    }

}
export const getGenres=() =>{
    return async function(dispatch){
        const json= await axios.get(`${apiUrl}/genres`)
            const data= json.data;
            console.log('asd',data)//todos los generos
        return dispatch({
            type: GET_GENRES,
            payload:data,
        });
    }

}

export const createVideogame =(form)=>{
    return async function (dispatch){
        try {
            const data= await axios.post(`${apiUrl}/videogames`, form);
            axios.get("/videogames")
            .then((json)=>json.data)
            .then((data)=>dispatch({
                type:GET_ALL_VIDEOGAMES,
                payload:data,
            }) )
                const data1=data;
                return (data1.data);
        } catch (error) {
            return alert(error.message)
        }
    }
}




export const filterByGenres=(filter) =>{
    return function(dispatch){
        return dispatch({
            type: FILTER_BY_GENRE,
            payload: filter,
        });
    }

}
export const filterByOrigin=(filter) =>{
    return function(dispatch){
        return dispatch({
            type: FILTER_BY_ORIGIN,
            payload:filter,
        });
    }

}

export const orderByName=(order) =>{
    return async function(dispatch){
        return dispatch({
            type: ORDER_BY_NAME,
            payload:order,
        });
    }

}
export const orderByRating=(order) =>{
    return async function(dispatch){
        return dispatch({
            type: ORDER_BY_RATING,
            payload:order,
        });
    }

}
