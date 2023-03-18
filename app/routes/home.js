const express = require('express')
const path = require('path')
const multer = require('multer')

const { api, setBearerToken } = require('../../config/axiosConfig')


const router = express.Router();
const jsonCRUD = require('../../config/jsonCRUD')
const Servico = require('../models/Servico')
const multerConfig = require('../../config/multerConfig')


const dbc = {
    pathPost: path.resolve(__dirname, '..', '..', 'config', 'jsons', 'post.json' ),
    path: path.resolve(__dirname, '..', '..', 'config', 'jsons', 'services.json' ),
    pathSbs: path.resolve(__dirname, '..', '..', 'config', 'jsons', 'subservicos.json' ),
    encoding: 'utf-8'
}

router.get('/', async (req,res) => {
  try {
    
    // const service = await api.get('service').then(res => {
    //   return res.data
    // }).catch(err => {
    //   return err.response.data
    // })

    let subservicos = ''
    let posts = ''

    // const test = Boolean(service[0])
    // if(test){
    //   subservicos = await service.filter(servico => servico.sub == true)
    // }

    // const posts = await api.get('posts').then(res => {
    //   return res.data
    // })
    
    res.status(200).render('layout/home', {
      conteudo: '/home/index',
      subservicos,
      posts
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      Error: 'Erro to access the home page'
    })
  }
})

router.get('/service/:servicoId', async (req, res) => { 
  try {
    const servicos = await jsonCRUD.JSONRead(dbc.path, dbc.encoding).then(res => {
      return res
    })
    
    if (!servicos) {
      res.status(404).send({Erro: 'Serviço não encontrado!'})
    }

    const id = req.params.servicoId * 1
  
    const servico = servicos.find( s => s.id == id)

    var clientNovo = null
  
    res.status(200).render('layout/home', {conteudo: 'service/index', servico, clientNovo })
  } catch (error) {
    res.status(400).send({
      Error: 'Erro ao encontrar o serviço'
    })
  }
})
 
router.get('/sobre', async (req, res) => {
  try {
    res.status(200).render('layout/home', {conteudo: '/home/sobre'})    
    
    
  } catch (error) {
    res.status(400).res.send({
      Error: 'Erro to access the service page'
    })
  }
})

router.get('/services', async (req, res) => {
  try {
    const servicos = await jsonCRUD.JSONRead(dbc.path, dbc.encoding).then(res => {
      return res
    })
    
    res.status(200).render('layout/home', {
      conteudo: '/home/servicos',
      servicos
    })    
  } catch (error) {
    res.status(400).res.send({
      Error: 'Erro to access the service page'
    })
  }
})

module.exports = app => app.use('/', router); 