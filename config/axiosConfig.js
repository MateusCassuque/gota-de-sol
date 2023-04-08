const axios = require('axios')

const api = axios.create({
    baseURL: process.env.BASEURL
})

module.exports =  { 
    api
} 