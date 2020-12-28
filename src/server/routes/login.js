const express = require('express')
const router = express.Router()
const Login = require('../models/login')


router.get('/', async (req, res) => {
    try {
        const allcus = await Login.find();

        res.json(allcus)
    } catch (err) {
        res.send('Error ' + err)
    }
})









router.post('/', async (req, res) => {
    try {
        const addcus = await new Login({
            fullname: req.body.fullname,
            state: req.body.state,
            district: req.body.district,
            taluk: req.body.taluk,
            tsc: req.body.tsc,

            authority: req.body.authority,
            phone: req.body.phone,
           eid:req.body.eid,
           password:req.body.password,
           date:req.body.date
            


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
        const ecus = await Login.findById(req.params.id)
        ecus.fullname= req.body.fullname,
        ecus.state= req.body.state,
        ecus.village= req.body.village,
        ecus.taluk= req.body.taluk,
        ecus.tsc= req.body.tsc,

        ecus.authority= req.body.authority,
        ecus.phone= req.body.phone,
        ecus.eid=req.body.eid,
        ecus.password=req.body.password


        const a1 = await ecus.save()
        res.json({
            status: "done"
        })
    } catch (err) {
        res.send('Error'+err)
    }

})


router.patch('/renewal/:id', async (req, res) => {


    try {
        const ecus = await Login.findById(req.params.id)
        ecus.date= req.body.date
       const a1 = await ecus.save()
        res.json({
            status: "done"
        })
    } catch (err) {
        res.send('Error'+err)
    }

})



module.exports = router













        