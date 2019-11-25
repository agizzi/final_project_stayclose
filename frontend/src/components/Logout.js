import React, { Component } from 'react';
import axios from 'axios';



axios.post('http://127.0.0.1:8000/api/rest-auth/logout/', {
}).then(res => {
    console.log(res)
    this.props.history.push("/logout");
}).catch(function (error) {
    alert('logout unsuccessful, try again')
})

