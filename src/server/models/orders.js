const mongoose = require('mongoose')



const ordersSchema = new mongoose.Schema({

    variety: {
        type: String,
        required: true
    },



    fullname: {
        type: String,
        required: true
    },

     fid: {
        type: String,
        required: true
    },

    
    village: {
        type: String,
        required: true
    },

    town: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },

 dfls: {
        type: String,
        required: true
    },



    source: {
        type: String,
        required: true
    },

  

    lotno: {
        type: String,
        required: true
    },


    hdate: {
        type: Date,
        required: true
    },
    ddate: {
        type: Date,
        required: true
    },

    date: {
        type: String,
        required: true
    },

 
   price: {
        type: String,
        required: true
    },
    
    phone: {
        type: String,
        required: true
    },
    

    mardate: {
        type: Date,
        required: true
    },

    market: {
        type: String,
        required: true
    },
    crcname: {
        type: String,
        required: true
    },

   
    subsidy: {
        type: String,
        required: true
    },



    
    avg:{
        type: String,
        required: true
    },



    //   batch: {
    //     type: Object,
    //     required: true
    // },


    farmerid: {
        type: String,
        required: true
    },

  

    fshare: {
        type: String,
        required: true
    },




    
    total: {
        type: String,
        required: true
    },

   
   

  dispatch:{
        type: Boolean,
        required: true
    },


    // farmer: {
    //     type: Object,
    //     required: true
    // },
  

    
    month: {
        type: String,
        required: true
    },


    
    
    year: {
        type: String,
        required: true
    },

})


module.exports = mongoose.model('orders', ordersSchema)