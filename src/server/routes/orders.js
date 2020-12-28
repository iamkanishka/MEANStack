const express = require('express')
const router = express.Router()
const Orders = require('../models/orders')


router.get('/', async (req, res) => {
    try {
        const allorders = await Orders.find();

        res.json(allorders.reverse())
    } catch (err) {
        res.send('Error ' + err)
    }
})




router.get('/dispatched/', async (req, res) => {
    try {
        const allorders = await Orders.find({ 'dispatch': true
    }).sort({
        'month': 1
    });

        res.json(allorders.reverse())
    } catch (err) {
        res.send('Error ' + err)
    }
})




router.get('/sorted/:month/:year', async (req, res) => {
    try {
        const sortorders = await Orders.find({
            'month': String(req.params.month),
            'year': String(req.params.year)
        }).sort({
            'month': 1
        })

        res.json(sortorders)
    } catch (err) {
        res.send('Error ' + err)
    }
})







router.post('/', async (req, res) => {
    try {
        const addorders = await new Orders({

            variety: req.body.variety,
            fullname: req.body.fullname,
            fid: req.body.fid,
            village: req.body.village,
            town: req.body.town,
            district: req.body.district,
            dfls: req.body.dfls,
            lotno: req.body.lotno,
            source: req.body.source,
            date: req.body.date,
            hdate: req.body.hdate,
            ddate: req.body.ddate,
            phone: req.body.phone,

            market: req.body.market,
            crcname: req.body.crc,
            subsidy: req.body.subsidy,

            fshare: req.body.fshare,
            avg: req.body.avg,
            // batch : req.body.batch,
            // farmer : req.body.farmer,
            total: req.body.total,
            dispatch: req.body.dispatch,
            mardate: req.body.mardate,
            price: req.body.price,
            farmerid: req.body.farmerid,
           
            month: req.body.month,

            year: req.body.year,








        }).save();

        // var lala =JSON.parse({
        //     status: "done"
        // })
        res.json({
            status: "done"
        })

    } catch (err) {
        res.json('Error' + err)
        console.log(err);
    }
})


router.patch('/disporder/:id', async (req, res) => {


    try {
        const eorders = await Orders.findById(req.params.id)
        eorders.dispatch = true


        const a1 = await eorders.save()
        res.json({
            status: "done"
        })
    } catch (err) {
        res.send('Error' + err)
    }

})






router.get('/sorted/:month/:year', async (req, res) => {
    try {
        var sortorders = await Orders.find({
            'month': String(req.params.month),
            'year': String(req.params.year)
        }).sort({
            'month': 1,
            'year':1
        })

        res.json(sortorders)
    } catch (err) {
        res.send('Error ' + err)
    }
})






router.patch('/:id', async (req, res) => {


    try {
        const eorders = await Orders.findById(req.params.id)
        eorders.variety = req.body.variety,

            eorders.phone = req.body.phone

        eorders.village = req.body.village
        eorders.date = req.body.date
        eorders.fullname = req.body.fullname,
            eorders.fid = req.body.fid,
            eorders.village = req.body.village,
            eorders.town = req.body.town,
            eorders.district = req.body.district,
            eorders.dfls = req.body.dfls,
            eorders.lotno = req.body.lotno,
            eorders.source = req.body.source,
            eorders.date = req.body.date,
            eorders.hdate = req.body.hdate,
            eorders.ddate = req.body.ddate,
            eorders.crcname = req.body.crc,
            eorders.subsidy = req.body.subsidy,
            eorders.fshare = req.body.fshare,
            eorders.avg = req.body.avg,
            eorders.market = req.body.market,
            eorders.dispatch = req.body.dispatch,
            eorders.total = req.body.total,
            eorders.mardate = req.body.mardate,
            eorders.price = req.body.price,
            eorders.farmerid = req.body.farmerid
          


        const a1 = await eorders.save()
        res.json({
            status: "done"
        })
    } catch (err) {
        res.send('Error' + err)
    }

})





router.delete('/:id', async (req, res) => {
    try {
        const dalien = await Orders.findByIdAndDelete(req.params.id)
        res.json(dalien)

    } catch (err) {
        res.send('Error' + err)
    }
})





router.patch('/editup/:id', async (req, res) => {


    try {
        const eorders = await Orders.findById(req.params.id)

        eorders.success = req.body.success,
            eorders.lowyield = req.body.lowyield,
            eorders.harvest = req.body.harvest,
            eorders.failed = req.body.failed


        const a1 = await eorders.save()
        res.json({
            status: "done"
        })
    } catch (err) {
        res.send('Error')
    }

})



router.delete('/deleteyeardata/:year', async (req, res) => {
    try {
        const dalien = await Orders.deleteMany({year:req.params.year})
        res.json({status:"Done"})

    } catch (err) {
        res.send('Error' + err)
    }
})


module.exports = router