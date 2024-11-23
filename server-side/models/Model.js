const mongoose = require('mongoose');

// schema for user 

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname:{
        type:String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
 });

// schema for add posts

 const PostSchema = new mongoose.Schema({
     username: {
        type: String,
     },
     title:{
        type:String
    },
    description:{
        type:String
    },
    picture:{
        type:String
    },
    categorie:{
        type:String
    },
    createdDate:{
        type:String
    }
 });

// schema for addcomments

 const CommentSchema = new mongoose.Schema({
    username:{
       type:String
   },
   postId:{
       type:String
   },
   comments:{
       type:String
   },
   date: {
    type: Date,
    default: Date.now,  
},});


 const User = mongoose.model('User', userSchema);

const Post = mongoose.model('Post',PostSchema);

const Comment = mongoose.model('comments',CommentSchema);

module.exports = {User,Post,Comment};