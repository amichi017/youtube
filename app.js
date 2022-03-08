const express = require('express')
const app = express()
const morgan = require('morgan');


const articlesRoutes = require('./api/routes/articles');

// מדפיס הודעות על כול בקשה בשרת
app.use(morgan("dev"));

// A בלי להשתמש ב  body מאפשר לקבל מידע שנשלח 
app.use(express.json());

// הסבר סרטון 4
app.use(express.urlencoded({
    extended: false
}));




app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authoriztion");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/articles', articlesRoutes);
//A
// app.use((req,res,next)=>{
//     req.on('data',(chank)=>{
//         console.log(chank.toString());
//     })
//     req.on('end',()=>{
//         next()
//     })
   
// })

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status=404;
    res.status(error.status || 5000).json({
        message:error.message
    })
})
module.exports=app;