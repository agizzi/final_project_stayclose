import { GET_CIRCLES } from './types';
import Axios from 'axios';

// GET CIRCLES
export const getCircles = () => dispatch => {
    axios
        .get("/api/circles")
        .then( res => {
            dispatch({
                type: GET_CIRCLES,
                payload: res.data
            });
        })
        .catch(err => console.log(err));

};