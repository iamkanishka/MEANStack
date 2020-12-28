const mongoose = require('mongoose')



const disinfSchema = new mongoose.Schema({

    village: {
        type: String,
        required: true
    },
  
    date: {
        type:Date,
        required: true
    },
  
 
   
    gram : {
        type: String,
        required: true,
       
    },

  bleach:{
    type: String,
    required: true,
  },

  bdh:{
    type: String,
    required: true,
  },


  sanitech:{
    type: String,
    required: true,
  },
stdh:{
    type: String,
    required: true,
  },
astra:{
    type: String,
    required: true,
  },
  asdh:{
    type: String,
    required: true,
  },
  
decol:{
    type: String,
    required: true,
  },

  dldh:{
    type: String,
    required: true,
  },

  chlorofect:{
    type: String,
    required: true,
  },


  cldh:{
    type: String,
    required: true,
  },

  total:{
    type: String,
    required: true,
  },
  month:{
    type: String,
    required: true,
  },
  
  year:{
    type: Number,
    required: true,
  }

})


module.exports = mongoose.model('disinf', disinfSchema)