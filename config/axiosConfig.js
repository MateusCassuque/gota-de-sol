const axios = require('axios')

const api = axios.create({
    baseURL: process.env.BASEURL_PRODUCTION
})

module.exports =  { 
    api
} 