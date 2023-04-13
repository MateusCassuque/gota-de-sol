require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')


const app = express()

app.set('views', __dirname + '/app/views')
app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/app/public'))
app.use(morgan("dev"))

require('./app/routes/index')(app)

app.get('*', async (req, res) => {
  
  const parametro = req.params
  
  res.render('layout/erro', {
    conteudo: 'noFound',
    parametro
  })

})

const port = process.env.PORT || 3003

app.listen(port, (()=>{
  console.log('\033[32mSERVIDOR RONDANDO\033[m')
  console.log('\033[33mACESSE EM: http://127.0.0.1:'+port + '\033[m')
}))