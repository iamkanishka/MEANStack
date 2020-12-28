const express = require('express')
const router = express.Router()
const Disinf = require('../models/disinf')


router.get('/', async (req, res) => {
    try {
        const allDisinf = await Disinf.find();

        res.json(allDisinf.reverse())
    } catch (err) {
        res.send('Error ' + err)
    }
})



router.get('/sorted/:month/:year', async (req, res) => {
    try {
        const sortDisinf = await Disinf.find({
            'month': String(req.params.month),
            'year': String(req.params.year)
        }).sort({
            'gram': 1
        })

        res.json(sortDisinf)
    } catch (err) {
        res.send('Error ' + err)
    }
})







router.post('/', async (req, res) => {
    try {
        const addDisinf = await new Disinf({
            month: req.body.month,
            year: req.body.year,
            date: req.body.date,
            gram: req.body.gram,
            village: req.body.village,
           
            bleach: req.body.bleach,
            decol: req.body.decol,
            bdh: req.body.bdh,
            sanitech: req.body.sanitech,
            chlorofect: req.body.chlorofect,
           astra:req.body.astra,
           asdh:req.body.asdh,
           cldh:req.body.cldh,
           dldh:req.body.dldh,
           stdh:req.body.stdh,
           total:req.body.total



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
        const eDisinf = await Disinf.findById(req.params.id)
       
        eDisinf.gram = req.body.gram,
        eDisinf.village = req.body.village
       
     

        const a1 = await eDisinf.save()
        res.json({
            status: "done"
        })
    } catch (err) {
        res.send('Error')
    }

})





router.delete('/:id', async (req, res) => {
    try {
        const dalien = await Disinf.findByIdAndDelete(req.params.id)
        res.json(dalien)

    } catch (err) {
        res.send('Error' + err)
    }
})




router.patch('/editup/:id', async (req, res) => {


    try {
        const eDisinf = await Disinf.findById(req.params.id)
       
    
        eDisinf.date = req.body.date
        eDisinf.bleach= req.body.bleach,
        eDisinf.decol= req.body.decol,
        eDisinf.bdh=req.body.bdh,
        eDisinf.sanitech= req.body.sanitech,
        eDisinf.chlorofect= req.body.chlorofect,
        eDisinf.astra=req.body.astra,
        eDisinf.asdh=req.body.asdh,
        eDisinf. cldh=req.body.cldh,
        eDisinf. dldh=req.body.dldh,
        eDisinf. stdh=req.body.stdh,
        eDisinf.total=req.body.total
     

        const a1 = await eDisinf.save()
        res.json({
            status: "done"
        })
    } catch (err) {
        res.send('Error'+err)
    }

})


module.exports = router