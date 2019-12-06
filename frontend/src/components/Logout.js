import React, { Component } from 'react';
import axios from 'axios';



axios.post('/api/rest-auth/logout/', {
}).then(res => {
    this.props.history.push("/logout");
}).catch(function (error) {
    alert('logout unsuccessful, try again')
})

