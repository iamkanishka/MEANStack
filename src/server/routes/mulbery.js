const express = require('express')
const router = express.Router()
const Mulbery = require('../models/mulbery')


router.get('/', async (req, res) => {
    try {
        const allfar = await Mulbery.find()

        res.json(allfar.reverse())
    } catch (err) {
        res.send('Error ' + err)
    }
})




router.get('/sorted/:month/:year', async (req, res) => {
    try {
        const sortfar = await Mulbery.find({'month':String(req.params.month),'year':String(req.params.year)}).sort({'gram':1})

        res.json(sortfar)
    } catch (err) {
        res.send('Error ' + err)
    }
})



router.post('/', async (req, res) => {
    try {
        const addfar = await new Mulbery({
            fullname: req.body.fullname,
            surveyno: req.body.surveyno, 
            date: req.body.date,
            muladdremo: req.body.muladdremo,
            year: req.body.year,
            month: req.body.month,
            phone: req.body.phone,
           
            village: req.body.village,

 }).save();

        res.json({
            status: "done"
        })

    } catch (err) {
        res.send('Error' + err)
    }
})



router.delete('/:id', async (req, res) => {
    try {
        const dalien = await Mulbery.findByIdAndDelete(req.params.id)
        res.json(dalien)

    } catch (err) {
        res.send('Error' + err)
    }
})



router.delete('/deleteyeardata/:year', async (req, res) => {
    try {
        const dalien = await Mulbery.deleteMany({year:req.params.year})
        res.json({status:"Done"})

    } catch (err) {
        res.send('Error' + err)
    }
})

module.exports = router