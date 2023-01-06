const router = require("express").Router()
const Person = require('../models/Person')


//Create
router.post('/', async(req,res) => {
    // req.body
    const {name,salary,approved} = req.body
    if(!name){
        res.status(422).json({error: "O nome é obrigatório"})
    }
    const person = {
        name,
        salary,
        approved
    }
    //CREATE
    try {
        await Person.create(person)
        res.status(201).json({message: "Pessoa Inserida com Sucesso"})
    } catch (error) {
        res.status(500).json({error : error})
    }
})

//Read
router.get('/', async(req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
        return
    } catch (error) {
        res.status(500).json({error : error})
    }
})

router.get('/:id', async(req, res) => {
    // Extrair dado da requisição
    const id = req.params.id
    try {
        const person = await Person.findOne({_id: id})
        if(!person){
            res.status(422).json({message: "Usuário não encontrado!"})
            return
        }
        res.status(200).json(person)
        
    } catch (error) {
        res.status(500).json({error : error})
    }
})


//Updade - (PUT, PATCH)
router.patch('/:id', async(req, res) => {
    const id = req.params.id
    const {name,salary,approved} = req.body
    const person = {
        name,
        salary,
        approved
    }
    try {
        
        const updatePerson = await Person.updateOne({_id: id}, person)
        if(updatePerson.matchedCount == 0){
            res.status(422).json({message: "Usuário não encontrado!"})
            return
        }
        res.status(200).json(person)
        
    } catch (error) {
        res.status(500).json({error : error})
    }
})


//delete
router.delete('/:id', async(req,res) => {
    const id = req.params.id
    try {
        const person = await Person.deleteOne({_id: id})
        if(!person){
            res.status(422).json({message: "Usuário não encontrado!"})
            return
        }
        res.status(200).json({message:"Pessoa deletada com sucesso!"})
        
    } catch (error) {
        res.status(500).json({error : error})
    }
    
})

module.exports = router
