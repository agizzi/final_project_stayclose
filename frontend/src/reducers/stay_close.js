import { Component } from 'react';
import { GET_CIRCLES } from "../actions/types";

const initialSate = {
    circles: []
}


export default function (state = initialSate, action){
    switch(action.type) {
        case GET_CIRCLES:
            return {
                ...state,
                circles: action.payload
            }
        default:
            return state;
    }
}