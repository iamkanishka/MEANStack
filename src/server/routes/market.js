const express = require('express')
const router = express.Router()
const Market = require('../models/market')


router.get('/', async (req, res) => {
    try {
        const allmar = await Market.find();

        res.json(allmar.reverse())
    } catch (err) {
        res.send('Error ' + err)
    }
})



router.get('/sorted/:month/:year', async (req, res) => {
    try {
        const sortmar = await Market.find({
            'month': String(req.params.month),
            'year': String(req.params.year)
        }).sort({
            'gram': 1
        })

        res.json(sortmar)
    } catch (err) {
        res.send('Error ' + err)
    }
})







router.post('/', async (req, res) => {
    try {
        const addmar = await new Market({

            variety: req.body.variety,
            date: req.body.date,
            gram: req.body.gram,
            reel: req.body.reel,
            seed: req.body.seed,
            village: req.body.village,
            month: req.body.month,
            year: req.body.year,



        }).save();

        res.json({
            status: "done"
        })

    } catch (err) {
        res.send('Error' + err)
    }
})

router.patch('/:id', async (req, res) => {


    try {
        const emar = await Market.findById(req.params.id)
        emar.variety = req.body.variety,
        //    emar.month=req.body.month,
        //    emar.year=req.body.year,

            emar.gram = req.body.gram,
            emar.village = req.body.village,
            emar.date=req.body.date

        const a1 = await emar.save()
        res.json({
            status: "done"
        })
    } catch (err) {
        res.send('Error')
    }

})





router.delete('/:id', async (req, res) => {
    try {
        const dalien = await Market.findByIdAndDelete(req.params.id)
        res.json(dalien)

    } catch (err) {
        res.send('Error' + err)
    }
})





router.patch('/editup/:id', async (req, res) => {


    try {
        const emar = await Market.findById(req.params.id)
     
            emar.reel = req.body.reel,
            emar.seed = req.body.seed
          

        const a1 = await emar.save()
        res.json({
            status: "done"
        })
    } catch (err) {
        res.send('Error')
    }

})

module.exports = router