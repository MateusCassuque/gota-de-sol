const express = require('express')
const path = require('path')

const { api, setBearerToken } = require('../../config/axiosConfig')

const router = express.Router()
const jsonCRUD = require('../../config/jsonCRUD')

const sf = {
    pathU: path.resolve(__dirname, '..', '..', 'config', 'jsons', 'users.json' ),
    pathS: path.resolve(__dirname, '..', '..', 'config', 'jsons', 'services.json' ),
    pathSb: path.resolve(__dirname, '..', '..', 'config', 'jsons', 'subservicos.json' ),
    pathP: path.resolve(__dirname, '..', '..', 'config', 'jsons', 'processes.json' ),
    pathSP: path.resolve(__dirname, '..', '..', 'config', 'jsons', 'subprocessos.json' ),
    pathPost: path.resolve(__dirname, '..', '..', 'config', 'jsons', 'post.json' ),
    encoding: 'utf-8'
}

router.get('/login', (req, res) => {
    res.render('pages/auth', {message: ''})
})

router.post('/', async (req, res) => {
    try{
        const data_res = await api.post('auth/authenticate', req.body).then(res => {
            setBearerToken(res.data.token)
            
            // const token = data_res.token
            // localStorage.setItem('token', token)
            return res.data
        }).catch(err => {
            return err.response
        })  
        
        const test = Boolean(data_res.status)
        
        if(test){
            const message = data_res.data.error
            return res.status(data_res.status).render('pages/auth', {message})
        } 
        
        // req.session.userAdmin = userAdmin
        return res.status(200).redirect('/auth/dashboard')  
    }catch(err){
        console.log(err)
        return res.status(400).render('layout/erro')
    }
})

router.get('/logout', (req, res) => {
    // req.session.destroy();
    // res.redirect('/');
})

router.get('/dashboard', async (req, res) => {
    try {
        const processos = await jsonCRUD.JSONRead(sf.pathP,sf.encoding).then(res => {
            return res
        })

        const subprocessos = await jsonCRUD.JSONRead(sf.pathSP,sf.encoding).then(res => {
            return res
        })
        
        const servicos = await jsonCRUD.JSONRead(sf.pathS,sf.encoding).then(res => {
            return res
        })
        const subservicos = await jsonCRUD.JSONRead(sf.pathSb,sf.encoding).then(res => {
            return res
        })

        res.status(200).render('layout/admin', {
            conteudo: 'auth/dashboard',
            servicos, 
            processos,
            subservicos,
            subprocessos,
            result: null
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({Error: 'Algo deu errado!: ' + error})
    }
})
    
router.get('/buscar', async (req, res) => {

    var result = {
        tipo: req.query.tipo,
        name: req.query.search
    }
    
    try {
        const processos = await jsonCRUD.JSONRead(sf.pathP,sf.encoding).then(res => {
            return res
        })

        const subprocessos = await jsonCRUD.JSONRead(sf.pathSP,sf.encoding).then(res => {
            return res
        })
        
        const servicos = await jsonCRUD.JSONRead(sf.pathS,sf.encoding).then(res => {
            return res
        })
        const subservicos = await jsonCRUD.JSONRead(sf.pathSb,sf.encoding).then(res => {
            return res
        })

        if(result.tipo == 'Serviço'){
            result.list = servicos.filter(s => s.name == result.name)
        }else if(result.tipo == 'Sub-Serviço'){
            result.list = subservicos.filter(sbs => sbs.name == result.name)
        }else if(result.tipo == 'Sub-Processo'){
            result.list = subprocessos.filter(sbp => sbp.client.name == result.name)
        }else if(result.tipo == 'Processo'){
            result.list = processos.filter(p => p.client.name == result.name)
        }

        res.status(200).render('layout/admin', {
            conteudo: 'auth/dashboard',
            servicos, 
            processos,
            subservicos,
            subprocessos,
            result
        })
        
    }catch(error){
        res.status(400).send({Erro: 'Erro ao Procurar por ' + result.name + error})
    }
})

router.get('/posts', async (req, res) => {
    try{

        const posts = await jsonCRUD.JSONRead(sf.pathPost,sf.encoding).then(res => {
            return res
        })

        res.status(200).render('layout/admin', {
            conteudo: 'auth/postagens',
            posts
        })
    }catch(error){
        res.status(400).send(error)
    }
})

module.exports = app => app.use('/auth', router)