const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const url = 'mongodb://localhost:27017/SmartCRC'
var cors = require('cors')

//const bodyParser = require('body-parser');
const open = require('open');
const app = express()
app.use(cors())
mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology: true } )
const con = mongoose.connection

app.use(express.static(path.join(__dirname,'dist')))

//app.use(express.json({ limit: "50mb" , extended: true,}))
app.use(express.json({ limit: "50mb"  }))

//app.use(express.bodyParser({limit: '50mb'}))
app.get('SARS',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/index.html'))
})

 //app.use(bodyParser.json({ limit: "50mb" , extended: true, parameterLimit: 50000  }))
 //app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

con.on('open', () => {
    try{
    // console.log('connected...')
    console.log('Have A Nice Day...')
    // console.log('kanishka loves sunny leone')
 //open('http://localhost:9000');
    // console.log('kanishka loves mia khalifa')
}catch(err){
    console.log(err);
    
}
})




app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE')

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
      //  console.log(`${req.ip},${req.method},${req.url}`);
        next();
    }


})




const farmerRouter = require('./routes/farmers')
app.use('/farmersdata',farmerRouter)



const mulberyRouter = require('./routes/mulbery')
app.use('/mulbery',mulberyRouter)

const batchesRouter = require('./routes/batches')
app.use('/batches',batchesRouter)


const marketRouter = require('./routes/market')
app.use('/market',marketRouter)


const cropRouter = require('./routes/orders')
app.use('/orders',cropRouter)

const disinfRouter = require('./routes/disinf')
app.use('/disinf',disinfRouter)

const loginRouter = require('./routes/login')
app.use('/logindata',loginRouter)


app.listen(9000, (req,res) => {
    try{
   console.log('Welcome To SARS-TSC')
    }catch(err){
        console.log(err);
        
    }

    
})