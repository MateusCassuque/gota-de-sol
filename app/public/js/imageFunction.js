const imgInput = document.querySelector('#imageInput');
var file = null

imgInput.addEventListener('change', function(e) {
    try {
        const tgt = e.target || window.event.srcElement
        
        const files = tgt.files
        const fr = new FileReader()
        
        fr.onload = function(){
            document.querySelector('#image').src = fr.result
            $('#image').css({
                display: 'flex',
            })
        }
        
        fr.readAsDataURL(files[0])
        
        file = files[0]
    } catch (error) {
        return console.log({Error: 'Error ao salvar a imagem ' + error})
    }

})


async function salvarFoto(filePhoto, id){
    try {
      let formDataImage = new FormData()

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