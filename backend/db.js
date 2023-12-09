var mongoose = require('mongoose'); 
const mongoURI = "mongodb+srv://singh28986:UMsIhcaLlXduU0fQ@inotebook.xqbdwin.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = async ()=>{

   await mongoose.connect(mongoURI)
   console.log('connected to mongo successfully!')
}

module.exports= connectToMongo;