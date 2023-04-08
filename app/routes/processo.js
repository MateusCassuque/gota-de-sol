const express = require('express')
const { api } = require('../../config/axiosConfig')
// const mailer = require('../../modules/mailer')

const router = express.Router()

router.post('/:servicoId', async (req, res) => {
    try {
        const id = req.params.servicoId
        const processo = req.body
        
        const servico = await api.get('Rservice/' + id).then(res => {
            return res.data
        }).catch(err => {
            return err.response.data
        })

        if(!servico){
            res.status(404).send('Service not find')
        }
        
        const clientNovo = await api.post('processo/' + id, processo ).then(res => {
            return res.data
        }).catch(err => {
            return err.response.data
        })

        // try {
        //     mailer.sendMail({
        //         to: 'mateusAbril7@gmail.com',
        //         from: 'mateusAbril2@gmail.com',
        //         template: 'newProcess',
        //         context: {service, client}
        //     })
            
        // } catch (error) {
            
        // } 

        res.status(200).render('layout/home', {
            conteudo: 'service/index',
            servico, clientNovo
        })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = app => app.use('/processo', router)
