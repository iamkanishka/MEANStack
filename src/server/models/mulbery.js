const mongoose = require('mongoose')



const mulberySchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
   muladdremo: {
        type: Number,
        required: true
    },

  
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },

   
    village: {
        type: String,
        required: true
    },
    phone: { 
        type:String,
        required: true
    },


 
    
    date: {
        type:String,
        required: true
    },
 
    surveyno: {
        type: String,
        required: true,
       
    },
   

  

})


module.exports = mongoose.model('mulbery', mulberySchema )