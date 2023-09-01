const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Posts');
const Comment = require('./models/Comments');



const dburi = 'mongodb+srv://ahd:JnZoTn5lLZpOSWNa@cluster0.eh9taen.mongodb.net/timeline?retryWrites=true&w=majority'
mongoose.connect(dburi)
.then((result)=> app.listen(3000))  
.catch((err)=> console.log(err));
const app = express();


app.set('view engine','ejs');  


app.use(express.static('public')) 

app.use(express.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.redirect('/home')
});





app.get('/home',(req,res)=>{
    Post.find().sort({createdAt: -1})   
    .then((result)=>{
       res.render('index',{posts: result});
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/comment',(req,res)=>{
    Post.find()
    .populate("comment")
    .sort({created_at: -1})
    .then((data)=>{
       res.render('Comment',{posts:data});
    })
    .catch((err)=>{
        console.log(err)
    });
    app.get('/comment',(req,res)=>{
    Comment.find().sort({createdAt: -1}) 
    .populate('PostId')
    .then((result)=>{
         res.render('Comment',{comment:result});
    })
    .catch((err)=>{
        console.log(err)
    });
    })
});


app.post('/',(req,res)=>{
    const post = new Post(req.body);
    post.save()
    .then((result)=>{
          res.redirect('/')
    })
    .catch((err)=>{
       console.log(err)
    })
})


app.post('/comment/:id',(req,res)=>{
    const comment = new Comment({
        body: req.body.body,
        PostId:req.params.id
    })
    comment.save()
    .then((result)=>{
        Post.findById(req.params.id)
        .then((Post)=>{
            Post.comment.push(comment._id)
            Post.save()
             .then(()=>{
                res.redirect('/')
             })
             .catch((err)=>{
                console.log(err)
             })
        })
        .catch((err)=>{
            console.log(err)
         })
    })
    .catch((err)=>{
       console.log(err)
    })
})




