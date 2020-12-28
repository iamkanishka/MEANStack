const express = require('express')
const router = express.Router()
const Farmers = require('../models/farmers')


router.get('/', async (req, res) => {
    try {
        const allfar = await Farmers.find();

        res.json(allfar.reverse())
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const idfar = await Farmers.findById(req.params.id)
        res.json(idfar)
    } catch (err) {
        res.send('Error ' + err)
    }
})




// router.get('/adhno/:adhno', async (req, res) => {
//     try {
//         const idfar = await Farmers.findOne({
//             adharno: Number(req.params.adhno)
//         })
//         res.json(idfar)
//     } catch (err) {
//         res.send('Error ' + err)
//     }
// })





router.get('/fid/:fid', async (req, res) => {
    try {
        const idfar = await Farmers.findOne({
            fid: String(req.params.fid)
        })
        res.json(idfar)
    } catch (err) {
        res.send('Error ' + err)
    }
})





router.get('/phno/:phno', async (req, res) => {
    try {
        const idfar = await Farmers.findOne({
            phone: Number(req.params.phno)
        })
        res.json(idfar)
    } catch (err) {
        res.send('Error ' + err)
    }
})


router.post('/', async (req, res) => {
    try {
        const addfar = await new Farmers({
            fullname: req.body.fullname,
     
            adharno: req.body.adharno,
            tscloc: req.body.tscloc,
            surveyno: req.body.surveyno,
            farmtype: req.body.farmtype,
            fftype: req.body.fftype,

            date: req.body.date,
            district: req.body.district,
            land: req.body.land,
            mulland: req.body.mulland,
          //  voteidno: req.body.voteidno,
            ifscno: req.body.ifscno,
            myuser: req.body.myuser,
            phone: req.body.phone,
            pincode: req.body.pincode,
            disdetails: req.body.disdetails,
            gender: req.body.gender,
            caste: req.body.caste,
            repid: req.body.repid,
            benifits: req.body.benifits,
           
            town: req.body.town,
            accntno: req.body.accntno,
            village: req.body.village,
            branch: req.body.branch,
            uid: req.body.uid,
            fid:req.body.fid,


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
        const efar = await Farmers.findById(req.params.id)
        efar.fullname= req.body.fullname,
 
        efar. adharno= req.body.adharno,
        efar. tscloc=req.body.tscloc,
        efar. surveyno= req.body.surveyno,
        efar. farmtype= req.body.farmtype,
        efar. fftype= req.body.fftype,
      
        efar. district= req.body.district,
        efar. land= req.body.land,
        efar.mulland= req.body.mulland,
        efar. fid= req.body.fid,
        efar. ifscno= req.body.ifscno,
      
        efar. phone= req.body.phone,
      
       efar.gender= req.body.gender,
       efar.caste= req.body.caste,
       efar.repid= req.body.repid,
      
       efar. town= req.body.town,
       efar. accntno= req.body.accntno,
       efar. village= req.body.village,
        efar.pincode= req.body.pincode,

       efar.branch=req.body.branch
        const a1 = await efar.save()
        res.json({
            status: "done"
        })
    } catch (err) {
        res.send('Error')
    }

})




router.patch('/salesup/:id', async (req, res) => {
    try {
        const upsalfar = await Farmers.findById(req.params.id)
       upsalfar.disdetails.push(req.body) 
        const a1 = await upsalfar.save()
        res.send({status:'Done'})

    } catch (err) {
        res.send('Error ' + err)
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const dalien = await Farmers.findByIdAndDelete(req.params.id)
        res.json(dalien)

    } catch (err) {
        res.send('Error' + err)
    }
})



router.patch('/addbenifit/:id', async (req, res) => {
    try {
        const upsalfar = await Farmers.findById(req.params.id)
       upsalfar.benifits.push(req.body) 
        const a1 = await upsalfar.save()
        res.send({status:'Done'})

    } catch (err) {
        res.send('Error ' + err)
    }
})



router.patch('/delbenifit/:id', async (req, res) => {
    try {
        const upsalfar = await Farmers.findById(req.params.id)
       upsalfar.benifits.splice(req.body.in,1) 
        const a1 = await upsalfar.save()
        res.send({status:'Done'})

    } catch (err) {
        res.send('Error ' + err)
    }
})



module.exports = router