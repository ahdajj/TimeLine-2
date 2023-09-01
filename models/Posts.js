const mongoose = require('mongoose')



  const Schema = mongoose.Schema ; 
  const PostSchema = new Schema ({
    title:{
        type:String,       
        required:true       
    },
    body: {
        type:String,
        required:true
    },
    comment:[{
        type:mongoose.Types.ObjectId,           
        ref:'Comment'                           
      }],
    created_at:{
       type:Date,
       default:Date.now()
    }
},)             

 
const Post = mongoose.model('Post' , PostSchema)    
module.exports = Post;