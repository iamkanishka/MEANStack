const mongoose = require('mongoose')



const loginSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    authority: {
        type: String,
        required: true
    },

   phone: { 
        type:Number,
        required: true
    },
    eid: { type: String,
        required: true
    },
  
   
    password: { 
        type:String,
        required: true
    },
    state: { type: String,
        required: true
    },
  
    district: { type: String,
        required: true
    },
  
    taluk: { type: String,
        required: true
    },
  
    tsc: { type: String,
        required: true
    },
  




    date: { type: String,
        required: true
    },
  
    
})


module.exports = mongoose.model('login', loginSchema)