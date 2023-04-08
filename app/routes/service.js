const express = require('express')
const { api } = require('../../config/axiosConfig')

const router = express.Router()

router.get('/:servicoId', async (req, res) => { 
  try {
    const id = req.params.servicoId 
    
    const servico = await api.get('Rservice/' + id).then(res => {
      return res.data
    }).catch(err => {
      return err.response.data
    })
    
    if (!servico) {
      res.status(404).send({Erro: 'Serviço não encontrado!'})
    }

    var clientNovo = null
  
    res.status(200).render('layout/home', {conteudo: 'service/index', servico, clientNovo })
  } catch (error) {
    res.status(400).send({
      Error: 'Erro ao encontrar o serviço'
    })
  }
})

module.exports = app => app.use('/service', router)
