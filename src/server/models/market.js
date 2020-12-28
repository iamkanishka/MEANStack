const mongoose = require('mongoose')



const marketSchema = new mongoose.Schema({

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

  seed:{
    type: String,
    required: true,
  },

  reel:{
    type: String,
    required: true,
  },


  variety:{
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


module.exports = mongoose.model('market', marketSchema)