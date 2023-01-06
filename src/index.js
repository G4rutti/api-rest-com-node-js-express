const express = require("express")
const app = express()

// forma de ler Json - maddlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())
// Rota Inicial - Endpoint
app.get('/', (req,res) => {
    // Mostrar Requisição

    res.json({message: 'Oi, Express!'})
})

// Entregar uma porta
app.listen(3000)