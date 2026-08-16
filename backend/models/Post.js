// ============================================================
// models/Post.js — MongoDB schema for a blog post.
//
// TODO here:
// 1. Import mongoose
// 2. Define a Schema with fields matching what the frontend expects:
//    - title (String, required)
//    - tag (String, required)          -> category e.g. "Tech", "Life"
//    - excerpt (String)                -> short preview text
//    - body (String, required)         -> full HTML/markdown content
//    - author (mongoose.Schema.Types.ObjectId, ref: 'User')  -> link to User model
//    - views (Number, default: 0)
//    - likes (Number, default: 0)
//    - likedBy (Array of user ids)     -> optional, to track WHO liked it
//    - comments ([{ name: String, text: String, createdAt: Date }])
//    - createdAt (Date, default: Date.now)
// 3. Export the model: module.exports = mongoose.model('Post', postSchema)
// ============================================================

const mongoose=require('mongoose'); 
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true,
        enum:['Essay','Tech','Travel','Life']
    },
    excerpt:{
        type:String,
    },
    body:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    views:{
        type:Number,
        default:0
    },
    likes:{
        type:Number,
        default:0
    },
    likedBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    comments:[
        {
            name:{type:String,required:true } ,
            text:{type:String , required:true},
            createdAt:{type:Date,default:Date.now}
                }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});
 module.exports=mongoose.model('Post',postSchema);