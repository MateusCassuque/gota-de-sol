const express = require('express')
const router = express.Router();

const { api, setBearerToken } = require('../../config/axiosConfig')

const multerConfig = require('../../config/multerConfig')

router.get('/planejar', async (req,res) => {
  try {
    res.status(200).render('layout/home', {
      conteudo: '/process/form_pedido', 
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({ 
      Error: 'Erro to access the home page'
    }) 
  }
})

router.get('/agentes', async (req,res) => {
    try {
      res.status(200).render('layout/home', {
        conteudo: 'agentes/index', 
      })
    } catch (error) {
      console.log(error)
      res.status(400).send({ 
        Error: 'Erro to access the home page'
      }) 
    }
}) 
  

module.exports = app => app.use('/pedido', router); 