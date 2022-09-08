const express = require('express');

const router = express.Router();
let productos = []

router.get('/', (req, res) =>{
    res.send({productos})
})

router.post('/', (req, res) =>{
    let producto = req.body
    productos.push(producto);
    res.send({message: 'producto creado', userCreated: producto})

})

module.exports = router;