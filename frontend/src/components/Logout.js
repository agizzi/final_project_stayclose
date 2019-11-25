import React, { Component } from 'react';
import axios from 'axios';

axios.post('http://127.0.0.1:8000/api/rest-auth/logout/', {
        }).then(res => {
            console.log(res)
            localStorage.clear();
            this.props.history.push("/profile");
        }).catch(function(error) {
            alert('logout unsuccessful, try again')
        })