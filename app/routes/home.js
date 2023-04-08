const express = require('express')
const { api } = require('../../config/axiosConfig')

const router = express.Router();

router.get('/', async (req,res) => {
  try {
    
    const servicos = await api.get('Rservice').then(res => {
      return res.data
    }).catch(err => {
      console.log('\033[31mErro ao se conectar no Banco: \033[m')
      return []
    })

    let subservicos = ''
    let posts = ''
    
    res.status(200).render('layout/home', {
      conteudo: '/home/index',
      subservicos,
      posts,
      servicos
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      Error: 'Erro to access the home page'
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

module.exports = app => app.use('/', router); 