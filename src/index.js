const express = require("express")
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

// forma de ler Json - maddlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//Rotas da API
const personRoutes = require('../routes/personRoutes')
app.use('/person', personRoutes)
// Rota Inicial - Endpoint
app.get('/', (req,res) => {
    // Mostrar Requisição

    res.json({message: 'Oi, Express!'})
})

// Entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jmstgmw.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000)
    console.log('Conectado')
})
.catch((error) => {
    console.log(error)
})
