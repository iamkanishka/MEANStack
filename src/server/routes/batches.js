const express = require('express')
const router = express.Router()
const Batches = require('../models/batches')


router.get('/', async (req, res) => {
    try {
        const allbat = await Batches.find();

        res.json(allbat.reverse())
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const idcus = await Batches.findById(req.params.id)
        res.json(idcus)
    } catch (err) {
        res.send('Error ' + err)
    }
})




// router.get('/adhno/:adhno', async (req, res) => {
//     try {
//         const idcus = await Customers.findOne({
//             adharno: Number(req.params.adhno)
//         })
//         res.json(idcus)
//     } catch (err) {
//         res.send('Error ' + err)
//     }
// })



router.post('/', async (req, res) => {
    try {
        const addcus = await new Batches({
            hdate: req.body.frmdate,
            ddate: req.body.todate,
            created: req.body.created,
            bname: req.body.bname,
            week: req.body.week,
            farmers: req.body.farmers,
            variety: req.body.variety,
            source: req.body.source,
            date: req.body.date,
            hdate: req.body.hdate,
            ddate: req.body.ddate,
            
            crcname: req.body.crc,
            avg: req.body.avg,
            mardate: req.body.mardate,
            price: req.body.price,



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
        const ebat = await Batches.findById(req.params.id)
        ebat.bname = req.body.bname,
            ebat.week = req.body.week,
            ebat.variety = req.body.variety,
            ebat.source = req.body.source,
        
            ebat.hdate = req.body.hdate,
            ebat.ddate = req.body.ddate,
            ebat.crcname = req.body.crc,
            ebat.subsidy = req.body.subsidy,
            ebat.avg = req.body.avg,
           
            ebat.mardate = req.body.mardate,
            ebat.price = req.body.price,
            ebat.source = req.body.source










        const a1 = await ebat.save()
        res.json({
            status: "done"
        })
    } catch (err) {
        res.send('Error')
    }

})



router.delete('/:id', async (req, res) => {
    try {
        const dalien = await Batches.findByIdAndDelete(req.params.id)
        res.json(dalien)

    } catch (err) {
        res.send('Error' + err)
    }
})



router.patch('/farmersadd/:id', async (req, res) => {
    try {
        const upsalfar = await Batches.findById(req.params.id)
        upsalfar.farmers.push(req.body)
        const a1 = await upsalfar.save()
        res.send({
            status: 'Done'
        })
    } catch (err) {
        res.send('Error ' + err)
    }
})



module.exports = router