const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('api route');
    res.status(200).json({message: 'api route'})
})

router.get('/test/:id', (req, res) => {
    console.log('id');
    res.status(200).json({message: `id entered:  ${req.params.id}`})
})

router.post('/countries', (req, res) => {
    const countries = req.body.countries
    const user = req.user

    res.status(200).json({msg: 'success'})
})

module.exports = router;
