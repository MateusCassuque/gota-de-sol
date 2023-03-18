const express = require('express')
const router = express.Router();

const { api } = require('../../config/axiosConfig')

router.post('/:servicoId', async (req, res) => {
  const id = req.params.servicoId
  
  const {file} = req.body

  try {
    console.log(file)
    
        async function salvarFoto(filePhoto, id){
            try {
            const formDataImage = new FormData()

            formDataImage.append('file', filePhoto)

            const serviceImg = await api.post('/img/' + id, 
                formDataImage, {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res =>{ 
                    console.log(res)
                }).catch(err => {
                console.log('Erro: ' + err)
                })
                
            } catch (error) {
                console.log(error)
            }
        }

        salvarFoto(file, id)
    
        res.send({ok: 'ok'})
        
    } catch (error) {
        
        res.status(400).send('Bad request: \n ' + error)
    }
})
    
    


  

module.exports = app => app.use('/img', router); 