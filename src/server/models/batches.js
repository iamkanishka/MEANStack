const mongoose = require('mongoose')



const batchesSchema = new mongoose.Schema({


bname:{
    type:String,
    required:true
},



hdate:{
    type:Date,
    required:true
},
ddate:{
    type:Date,
    required:true
},

week:{
    type:String,
    required:true
},




mardate: {
    type: Date,
    required: true
},

crcname: {
    type: String,
    required: true
},


source: {
    type: String,
    required: true
},




    



date:{
    type: String,
    required: true
},

created:{
    type:Date,
    required:true

},


    
variety:{
    type: String,
    required: true
},

    
price:{
    type: String,
    required: true
},


   
farmers:{
    type:Array,
    required:true
}

})


module.exports = mongoose.model('batches', batchesSchema)