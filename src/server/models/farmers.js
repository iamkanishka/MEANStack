const mongoose = require('mongoose')



const farmersSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    adharno: {
        type: Number,
        required: true
    },

  
    town: {
        type: String,
      
    },
    district: {
        type: String,
    
    },

   tscloc: {
        type: String,
        
    },
    village: {
        type: String,
       
    },
    phone: { 
        type:String,
        required: true
    },


    mulland: {
        type: String,
      
    
    },

   land: {
        type: String,
     
    
    },
    
    date: {
        type:Date,
        required: true
    },
    caste: {
        type: String,
     
    },

    gender: {
        type: String,
   
    },

 disdetails: {
        type: Array,
        required: true,

    },
   
    benifits: {
        type: Array,
        required: true,

    },

    myuser:{
        type:Object,
        required:true,
    },
  
 farmtype:{
    type:Object,

},
  
fftype:{
    type:Object,

},

    surveyno: {
        type: String,
      
       
    },
   

   fid : {
        type: String,
        required: true,
       
    },

    ifscno: {
        type: String,
      
       
    },

   branch : {
        type: String,
     
       
    },
    repid: {
        type: String,
   
       
    },
   
   accntno: {
        type: String,
      
       
    },
    pincode: {
        type: Number,
      
       
    },
    uid: {
        type: String,
      
       
    },
})


module.exports = mongoose.model('farmers', farmersSchema)