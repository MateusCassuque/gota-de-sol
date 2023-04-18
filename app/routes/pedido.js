const express = require('express')
const router = express.Router();

const { api } = require('../../config/axiosConfig')

router.get('/', async (req,res) => {
  try {
    const novoPedido = ''
    let message = ''      
    const tipo = ''
    
    
    res.status(200).render('layout/home', {
      conteudo: '/process/form_pedido',
      novoPedido,
      tipo,
      message
    })
  } catch (error) {
    res.status(400).send({ 
      Error: 'Erro to access the home page'
    }) 
  }
})

router.post('/', async (req,res) => {
  try {
    const {nome_completo, telefone, motivo, para} = req.body
    const tipo = ''
    let message = ''
    let novoPedido = ''

    const pedidos = await api.get('pedido')
      .then( res => {
        return res.data
      })
      .catch(res => {
        res.response.data
      })

    let pedido = pedidos
    .find(pedido => pedido.nome_completo === nome_completo && pedido.telefone === telefone && pedido.motivo === motivo && pedido.para === para)
    
    if(pedido){
      message = 'Processo não enviado. ' + pedido.nome_completo + ', você já tem um registro no nosso banco de dados.'
      return res.status(401).render('layout/home', {
        conteudo: '/process/form_pedido',
        novoPedido,
        tipo,
        message
      })
    }
        
    pedido = req.body
    
    novoPedido = await api.post('pedido', pedido)
    .then( res => {
      return res.data
    })
    .catch(res => {
      res.response.data
    })
    
    res.status(200).render('layout/home', {
      conteudo: '/process/form_pedido',
      novoPedido,
      tipo,
      message      


    })
  } catch (error) {
    res.status(400).send({ 
      Error: 'Erro to access the home page'
    }) 
  }
})

router.get('/:tipo', async (req,res) => {
  try {
    const novoPedido = ''      
    const tipo = req.params.tipo
    let message = ''

    res.status(200).render('layout/home', {
      conteudo: '/process/form_pedido',
      novoPedido,     
      tipo,
      message
    })
  } catch (error) {
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
      res.status(400).send({ 
        Error: 'Erro to access the home page'
      }) 
    }
})


module.exports = app => app.use('/pedido', router);