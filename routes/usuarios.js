const express = require('express');

const router = express.Router();
const usuarios = []


const middlewareCoder = (req, res, next) =>{
    console.log('peticion recibida');
    if(true)    next()
    else res.status(404).send({message: 'error'});
}

router.get('/', middlewareCoder, (req, res) =>{
    res.send({usuarios})
})

router.post('/', (req, res) =>{
    let usuario = req.body
    usuarios.push(usuario);
    res.send({message: 'usuario creado', userCreated: usuario})
})

module.exports = router;